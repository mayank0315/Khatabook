const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab-model");
const bcrypt = require("bcrypt");

module.exports.homepageController = function (req, res) {
  let message = req.flash("error");
  res.render("index", { isLoggedin: false, error: message });
};


module.exports.loginController = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    res.redirect("/");
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.redirect("/");
    return;
  } else {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.redirect("/profile");
  }
};


module.exports.profileController = async function (req, res, next) {
  const id = req.user.id;

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const order = req.query.byDate ? Number(req.query.byDate) : -1;

  const user = await userModel.findOne({ _id: id });

  const hisaab = await hisaabModel
    .find({
      user: user._id,
      createdAt: {
        $gte: startDate ? new Date(startDate) : new Date(0),
        $lt: endDate ? new Date(endDate) : new Date(),
      },
    })
    .sort({ createdAt: order })
    .exec();

  res.render("profile", { isLoggedin: true, user, hisaab });
};


module.exports.registerPageController = async function (req, res, next) {
  res.render("register", { isLoggedin: false });
};


module.exports.registerController = async function (req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/register");
  }

  const emailUser = await userModel.findOne({ email });
  if (emailUser) {
    req.flash("error", "User already exists");
    return res.redirect("/register");
  }

  const userNameUser = await userModel.findOne({ username });
  if (userNameUser) {
    req.flash("error", "UserName already exists");
    return res.redirect("/register");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.redirect("/profile");
};


module.exports.logoutController = function (req, res) {
  req.logout(); // Or your specific logout logic
  res.redirect("/");
};

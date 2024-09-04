
const { isLoggedin } = require("../middlewares");
const hisaabModel = require("../models/hisaab-model");
const userModel = require("../models/user-model");

module.exports.createPageController = async function (req, res, next) {
  res.render("create", { isLoggedin: true });
};
module.exports.createHisaabController = async function (req, res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    req.flash("error", "All field are required");
    return res.redirect("hisaab/create");
  }

  const isEditable = req.body.editpermission == "on" ? true : false;
  const isEncrypted = req.body.encrypted == "on" ? true : false;
  const shareable = req.body.shareable == "on" ? true : false;
  const passcode = req.body.passcode == "on" ? true : false;

  const newHisaab = new hisaabModel({
    user: req.user.id,
    title,
    data: description,
    editable: isEditable,
    isEncrypted,
    passcode,
    shareable,
  });

  await newHisaab.save();

  res.redirect("/profile");
};

module.exports.readHisaabController = async function (req, res, next) {
  const id = req.params.id;
  const hisaab = await hisaabModel.findOne({
    _id: id,
  });

  if (!hisaab) {
    return res.redirect("/profile");
  }
  if (hisaab.isEncrypted) {
    return res.render("passcode", { isLoggedin: true, id });
  }

  return res.render("hisaab", { isLoggedin: true, hisaab });
};

module.exports.deleteController = async function (req, res, next) {
  const id = req.params.id;

  const hisaab = await hisaabModel.findOne({
    _id: id,
    user: req.user.id,
  });

  if (!hisaab) {
    return res.redirect("/profile");
  }
  await hisaabModel.deleteOne({
    _id: id,
  });

  return res.redirect("/profile");
};

module.exports.editController = async function (req, res, next) {
  const id = req.params.id;

  const hisaab = await hisaabModel.findById(id);

  if (!hisaab) {
    return res.redirect("/profile");
  }

  return res.render("edit", { isLoggedin: true, hisaab });
};

module.exports.editPostController = async function (req, res, next) {
  const id = req.params.id;

  const hisaab = await hisaabModel.findById(id);

  if (!hisaab) {
    return res.redirect("/profile");
  }

  hisaab.title = req.body.title;
  hisaab.data = req.body.description;
  hisaab.editable = req.body.editpermission == "on" ? true : false;
  hisaab.isEncrypted = req.body.encrypted == "on" ? true : false;
  hisaab.passcode = req.body.passcode;
  hisaab.shareable = req.body.shareable == "on" ? true : false;

  await hisaab.save();

  res.redirect("/profile");
};

module.exports.readVerifiedHisaabController = async function (req, res, next) {
  const id = req.params.id;

  const hisaab = await hisaabModel.findOne({ _id: id });

  if (!hisaab) {
    return res.redirect("/profile");
  }

  if (hisaab.passcode !== req.body.passcode) {
    return res.redirect("/profile");
  }

  return res.render("hisaab", { isLoggedin: true, hisaab });
};

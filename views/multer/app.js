const express = require("express");
const app = express();
const upload = require("./multer");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("uploaded.");
});

app.listen(3000);

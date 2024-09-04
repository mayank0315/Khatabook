const express = require("express");
const router = express.Router();


const {
  createPageController,
  readHisaabController,
  readVerifiedHisaabController,
  createHisaabController,
  deleteController,
  editController,
  editPostController,
} = require("../controllers/hisaabController");
const { isLoggedin } = require("../middlewares");

router.get("/create", isLoggedin , createPageController);
router.post("/create", isLoggedin , createHisaabController);

router.get('/delete/:id', isLoggedin, deleteController)

router.get('/edit/:id',isLoggedin, editController)
router.post('/edit/:id',isLoggedin, editPostController)

router.get("/view/:id", isLoggedin, readHisaabController);
router.post("/verify/:id",  readVerifiedHisaabController);

module.exports = router;



const express = require("express");
// const userController = require("../controllers/userController");
// const postController = require("../controllers/postController");

const router = express.Router();

router.get("/me", userController.getMe);
router.patch(
  "/",
  upload.fields([{ name: "profilePic", maxCount: 1 }]),
  userController.updateProfile
);
router.get("/posts", postController.getUserPost);

module.exports = router;

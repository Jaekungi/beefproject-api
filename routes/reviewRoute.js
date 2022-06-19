const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

router.get("/", reviewController.getReview);
// //เพิ่ม patch + delete รีวิวของ user นั้นๆ

router.post(
  "/",
  authenticate,
  upload.single("image"),
  reviewController.createReview
);
router.patch("/:id", upload.single("image"), reviewController.updateReview);
router.delete("/", reviewController.deleteReview);

module.exports = router;

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const upload = require("../middlewares/upload");

router.get("/", reviewController.getReview);
module.exports = router;
//เพิ่ม patch + delete รีวิวของ user นั้นๆ

router.post("/", upload.single("image"), reviewController.createReview);
router.patch("/:id", upload.single("image"), reviewController.updateReview);
router.delete("/", reviewController.createReview);

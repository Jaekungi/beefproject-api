// const fs = require("fs");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");
const { User, Review, sequelize } = require("../models");

console.log("Review", Review);

exports.createReview = async (req, res, next) => {
  try {
    const { title, subtitle, userId, reviewtext } = req.body;

    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }

    const createdReview = await Review.create({
      title,
      subtitle,
      userId,
      reviewtext,
    });

    res.json({ createdReview });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getReview = async (req, res, next) => {
  try {
    console.log(req.user);
    const { id } = req.user;
    res.json({ test: "test" });
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
  } catch (err) {}
};

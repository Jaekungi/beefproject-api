// const fs = require("fs");
// const createError = require("../utils/createError");
// const cloudinary = require("../utils/cloudinary");
const { User, Review, sequelize } = require("../models");

console.log("Review", Review);

exports.createReview = async (req, res, next) => {
  try {
    const { title, subtitle, userId, review_text, img } = req.body;

    const createdReview = await Review.create({ title, subtitle, userId });

    res.json({ createdReview });
  } catch (err) {
    next(err);
  }
};

exports.getReview = async (req, res, next) => {
  try {
    res.json({ test: "test" });
  } catch (err) {
    next(err);
  }
};

const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");
const { User, Review, sequelize } = require("../models");
const fs = require("fs");

exports.createReview = async (req, res, next) => {
  try {
    // const { title, subTitle, context } = req.body;
    const { id } = req.user;
    const { title, SubTitle, context } = req.body;
    const file = req.file;

    if (!title && !context) {
      createError("Title or Context is required", 400);
    }

    if (!file) {
      createError("Image is required", 400);
    }

    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }

    const createdReview = await Review.create({
      title,
      image,
      userId: id,
      subtitle: SubTitle,
      reviewtext: context,
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
    const { id } = req.user;
    res.json({ userId });
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  const file = req.file;
  try {
    const { title } = req.body;
    const { id } = req.params;
    if (!title && !file) {
      createError("Title or image is required", 400);
    }
    const review = await Review.findOne({ where: { id } });
    if (!review) {
      createError("Review not found", 400);
    }
    if (review.userId !== req.user.id) {
      createError("You have no permission", 403);
    }

    if (file) {
      if (review.image) {
        const splitted = req.user.profilePic.split("/");
        const publicId = splitted[splitted.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      const result = await cloudinary.upload(file.path);
      review.image = result.secure_url;
    }

    if (title) {
      review.title = title;
    }
    await review.save();

    res.json({ review });
  } catch (err) {
    next(err);
  } finally {
    if (file) {
      fs.unlinkSync(file.path);
    }
  }
};

exports.deleteReview = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const review = await Review.findOne({ where: { id } });
    if (!review) {
      createError("Review not found", 400);
    }
    if (review.userId !== req.user.id) {
      createError("You have no permission", 403);
    }
    await Comment.destroy({ where: { reviewId: id } }, { transaction });
    await Like.destroy({ where: { reviewId: id } }, { transaction });
    if (review.image) {
      const splitted = req.user.profilePic.split("/");
      const publicId = splitted[splitted.length - 1].split(".")[0];
      await cloudinary.destroy(publicId);
    }
    await Review.destroy({ where: { id } }, { transaction });
    await transaction.commit();
    res.status(204).json();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

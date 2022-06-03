const fs = require("fs");
const { User } = require("../models");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/createError");

exports.getMe = async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  res.json({ user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (!req.files) {
      createError("profilePic is required", 400);
    }

    const updateValue = {};
    if (req.files.profilePic) {
      const result = await cloudinary.upload(req.files.profilePic[0].path);
      if (req.user.profilePic) {
        const splited = req.user.profilePic.split("/");
        const publicId = splited[splited.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updateValue.profilePic = result.secure_url;
    }

    await User.update(updateValue, { where: { id: req.user.id } });
    res.json(updateValue);
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profilePic) {
      fs.unlinkSync(req.files.profilePic[0].path);
    }
  }
};

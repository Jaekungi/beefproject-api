const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(req.headers);
    console.log(authorization);
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("you are unauthorized1", 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      createError("you are unauthorized2", 401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      createError("you are unauthorized3", 401);
    }
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

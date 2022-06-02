module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    role: {
      type: DataTypes.ENUM(["user", "admin"]),
      defaultValue: "user",
      allowNull: false,
    },
    profileImage: DataTypes.STRING,
    allowNull: true,
  });

  Post.associate = (models) => {
    Post.hasMany(models.Blog, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  Post.associate = (models) => {
    Post.hasMany(models.Rating, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return User;
};

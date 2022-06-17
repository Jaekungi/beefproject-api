module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
      },
    },
    {
      underscored: true,
    }
  );

  //   User.associate = (models) => {
  //     User.hasMany(models.Post, {
  //       foreignKey: {
  //         name: "userId",
  //         allowNull: false,
  //       },
  // });

  // User.hasMany(models.Comment, {
  //   foreignKey: {
  //     name: "userId",
  //     allowNull: false,
  //   },
  //   onUpdate: "RESTRICT",
  //   onDelete: "RESTRICT",
  // });

  // User.hasMany(models.Like, {
  //   foreignKey: {
  //     name: "userId",
  //     allowNull: false,
  //   },
  //   onUpdate: "RESTRICT",
  //   onDelete: "RESTRICT",
  // });

  // User.hasMany(models.Friend, {
  //   as: "RequestFrom",
  //   foreignKey: {
  //     name: "requestFromId",
  //     allowNull: false,
  //   },
  //   onUpdate: "RESTRICT",
  //   onDelete: "RESTRICT",
  // });

  // User.hasMany(models.Friend, {
  //   as: "RequestTo",
  //   foreignKey: {
  //     name: "requestToId",
  //     allowNull: false,
  //   },
  //   onUpdate: "RESTRICT",
  //   onDelete: "RESTRICT",
  // });
  //   };

  return User;
};

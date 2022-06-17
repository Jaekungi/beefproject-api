module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    content: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,

    reviewtext: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Review.associate = (models) => {
  //   Review.belongsTo(models.User, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //   });
  // };

  return Review;
};

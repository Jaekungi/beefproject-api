module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Rating;
};

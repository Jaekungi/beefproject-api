module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Blog", {
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
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Post;
};

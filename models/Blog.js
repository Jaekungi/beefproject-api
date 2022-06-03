module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
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

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Blog;
};

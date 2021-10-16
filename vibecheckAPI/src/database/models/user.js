//Code from Code Archive of Week 08 Lab/Prac.
module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    timestamps: false
  });

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ use db.js
const Category = require('./category.model');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: true,
});

// Association
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;

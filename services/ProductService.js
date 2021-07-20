const Product = require("../model/product");
const Category = require("../model/category");

const getProductById = async (id) => {
  const product = await Product.findById({ _id: id });
  return product;
};

const getCategoryByID = async (id) => {
  const category = await Category.findById({ _id: id });
  return category;
};

module.exports = { getProductById, getCategoryByID };

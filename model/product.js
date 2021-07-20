const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  qtyPerUnit: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  unitInStock: {
    type: Number,
    required: true,
  },
  discontinued: {
    type: Boolean,
    default: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

productSchema.methods.toJSON = function () {
  const product = this;
  const productObject = product.toObject();  
  // delete productObject._id
  delete productObject.__v;
  delete productObject.createdAt;
  delete productObject.updatedAt;
  return productObject;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

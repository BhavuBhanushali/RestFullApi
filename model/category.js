const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

categorySchema.methods.toJSON = function () {
  const category = this;
  const categoryObject = category.toObject();  
  // delete categoryObject._id
  delete categoryObject.__v;
  delete categoryObject.createdAt;
  delete categoryObject.updatedAt;
  return categoryObject;
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

const Product = require("../model/product");
const Category = require("../model/category");
const mongoose = require("mongoose");
const productService = require("../services/ProductService");

//create product
const createProduct = async (req, res) => {
  try {
    const categoryData = await new Category({
      categoryName: req.body.categoryName,
    });

    const productData = await new Product({
      productName: req.body.productName,
      qtyPerUnit: req.body.qtyPerUnit,
      unitPrice: req.body.unitPrice,
      unitInStock: req.body.unitInStock,
      categoryId: categoryData._id,
    });

    await categoryData.save();
    await productData.save();
    res.status(201).send({ categoryData, productData });
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
};

//fetch single product by id:productId
const getOneProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ errorMessage: "product id is required" });
    } else {
      const getSingleProduct = await Product.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
          },
        },

        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "ProductData",
          },
        },
        {
          $unwind: {
            path: "$ProductData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            productName: 1,
            qtyPerUnit: 1,
            unitPrice: 1,
            unitInStock: 1,
            "ProductData._id": 1,
            "ProductData.categoryName": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            productName: {
              $first: "$productName",
            },
            qtyPerUnit: {
              $first: "$qtyPerUnit",
            },
            unitPrice: {
              $first: "$unitPrice",
            },
            unitInStock: {
              $first: "$unitInStock",
            },
            Category: {
              $first: "$ProductData.categoryName",
            },
          },
        },
      ]);
      res.send({ data: getSingleProduct });
    }
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
};

//fetch all product add query.search={text}
const getAllProducts = async (req, res) => {
  try {
    let pipeline = [];

    pipeline.push(
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "ProductData",
        },
      },
      {
        $unwind: {
          path: "$ProductData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          qtyPerUnit: 1,
          unitPrice: 1,
          unitInStock: 1,
          "ProductData._id": 1,
          "ProductData.categoryName": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          productName: {
            $first: "$productName",
          },
          qtyPerUnit: {
            $first: "$qtyPerUnit",
          },
          unitPrice: {
            $first: "$unitPrice",
          },
          unitInStock: {
            $first: "$unitInStock",
          },
          Category: {
            $first: "$ProductData.categoryName",
          },
        },
      }
    );

    if (req.query.search) {
      pipeline.push({
        $match: {
          $or: [
            {
              productName: {
                $regex: new RegExp(`^${req.query.search}`),
                $options: "i",
              },
            },
            {
              Category: {
                $regex: new RegExp(`^${req.query.search}`),
                $options: "i",
              },
            },
          ],
        },
      });
    }

    const getAllProduct = await Product.aggregate(pipeline);
    res.send({ data: getAllProduct });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//update single product by id:productId
//update allowed only {prooductName,qtyPerUnit,unitPrice,unitInStock}
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(400).send({ errorMessage: "No Product Associate with Id" });
    }
    const updates = Object.keys(req.body);

    const updateAllowed = [
      "productName",
      "qtyPerUnit",
      "unitPrice",
      "unitInStock",
    ];
    const isValidOperation = updates.every((update) =>
      updateAllowed.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ errorMessage: "Invalid Updates" });
    }

    await Product.findOneAndUpdate({ _id: product._id }, req.body, {
      new: true,
    });

    const updatedProduct = await productService.getProductById(productId);
    res.status(200).send({ message: "Product Updated!", data: updatedProduct });
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
};

//delete single product by id:productId
const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(400).send({ errorMessage: "Product not associate with Id" });
    } else {
      const category = await productService.getCategoryByID(product.categoryId);
      await Product.findByIdAndDelete(product._id);
      await Category.findByIdAndDelete(category._id);
      res
        .status(200)
        .send({ message: "Product has been successfully removed.." , product});
    }
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
};

module.exports = {
  createProduct,
  getOneProduct,
  getAllProducts,
  updateProduct,
  removeProduct,
};

const express = require("express");

const router = express.Router();

const productController = require("../controller/ProductController");

/**apiDoc
 * @api {post} /crate  Request Product Creation
 * @apiName Create Product
 * @apiGroup Product Routes
 *
 * @apiSuccess {String} productName       Name of the Product.
 * @apiSuccess {Number} qtyPerUnit        Quantity per Unit  of the Product.
 * @apiSuccess {Number} unitPrice         Product Price.
 * @apiSuccess {Number} unitInStock       Avaialble product
 * @apiSuccess {String} categoryName      Category of Product
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 201 Created
 *{
 *   "categoryData": {
 *       "_id": "60f665273848f105e4fdf33b",
 *       "categoryName": "Mobile"
 *   },
 *   "productData": {
 *       "discontinued": false,
 *       "_id": "60f665273848f105e4fdf33c",
 *       "productName": "Samsung M30",
 *       "qtyPerUnit": 1,
 *       "unitPrice": 20000,
 *       "unitInStock": 50,
 *       "categoryId": "60f665273848f105e4fdf33b"
 *   }
 *}
 */

//create product
//productName,qtyPerUnit,unitPrice,unitInStock,categoryName
router.post("/create", productController.createProduct);

/**apiDoc
 * @api {get} /read/:id  Request Get Product
 * @apiName Get Single Product
 * @apiGroup Product Routes
 *
 * @apiParam {String} id       Unique id of the Product.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *   "_id": "60f5b37bca9bec006c3e50c3",
 *   "productName": "RealMe 7x",
 *   "qtyPerUnit": 5,
 *   "unitPrice": 30000,
 *   "unitInStock": 100,
 *   "Category": "Mobile and Electronic"
 * }
 */

//get signle product
//id:productId
router.get("/read/:id", productController.getOneProduct);

/**apiDoc
 * @api {get} /read/:id  Request Get All Products List
 * @apiName Get All Product
 * @apiGroup Product Routes
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  "data": [
 *       {
 *           "_id": "60f5b37bca9bec006c3e50c3",
 *           "productName": "RealMe 7x",
 *           "qtyPerUnit": 5,
 *           "unitPrice": 30000,
 *           "unitInStock": 100,
 *           "Category": "Mobile and Electronic"
 *       },
 *       {
 *           "_id": "60f665273848f105e4fdf33c",
 *           "productName": "Samsung M30",
 *           "qtyPerUnit": 1,
 *           "unitPrice": 20000,
 *           "unitInStock": 50,
 *           "Category": "Mobile"
 *       },
 *       {
 *           "_id": "60f5bac84340bd03e0189324",
 *           "productName": "Pilow",
 *           "qtyPerUnit": 5,
 *           "unitPrice": 200,
 *           "unitInStock": 100,
 *           "Category": "Home"
 *       },
 *        ... *
 *   ]
 */
//get All Product
//availabel search query search={any string}
router.get("/readAll", productController.getAllProducts);

/**apiDoc
 * @api {patch} /update/:id  Request Update Signle Product
 * @apiName  Update Product
 * @apiGroup Product Routes
 *
 * @apiSuccess {String} productName       Name of the Product.
 * @apiSuccess {Number} qtyPerUnit        Quantity per Unit  of the Product.
 * @apiSuccess {Number} unitPrice         Product Price.
 * @apiSuccess {Number} unitInStock       Avaialble product
 *
 * @apiParam {String} id       Unique id of the Product.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *   "message": "Product Updated!",
 *   "data": {
 *       "discontinued": false,
 *       "_id": "60f665273848f105e4fdf33c",
 *       "productName": "Redmi note 11x pro",
 *       "qtyPerUnit": 1,
 *       "unitPrice": 45000,
 *       "unitInStock": 200,
 *       "categoryId": "60f665273848f105e4fdf33b"
 *   }
 * }
 */
//id:productId
//update Single Product
router.patch("/update/:id", productController.updateProduct);


/**apiDoc
 * @api {delete} /deete/:id  Request for Delete Product
 * @apiName  Delete Product
 * @apiGroup Product Routes
 *
 *
 * @apiParam {String} id       Unique id of the Product.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *   "message": "Product has been successfully removed..",
 *   "product": {
 *       "discontinued": false,
 *       "_id": "60f66bcb91eaa735d824fd79",
 *       "productName": "Samsung M30",
 *       "qtyPerUnit": 1,
 *       "unitPrice": 20000,
 *       "unitInStock": 50,
 *       "categoryId": "60f66bcb91eaa735d824fd78"
 *   }
 * }
 */
//id:productId
//Remove Single Product
router.delete("/delete/:id", productController.removeProduct);

module.exports = router;

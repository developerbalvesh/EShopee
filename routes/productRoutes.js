import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  categoryWiseProductController,
  createProductController,
  deleteProductController,
  filterProductsController,
  getProductsController,
  getSingleProductController,
  productCountController,
  productPhotoController,
  productsPerPageController,
  searchProductController,
  similarProductController,
  updateProductController,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// get products
router.get("/get-products", getProductsController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/product/:pid", requireSignIn, isAdmin, deleteProductController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

// filter product route
router.post("/filter-products", filterProductsController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/products-per-page/:page", productsPerPageController);

// search product
router.get("/search/:keyword", searchProductController);

// similar products
router.get("/similar-product/:pid/:cid", similarProductController);

// category wise product
router.get("/product-category/:slug", categoryWiseProductController);

// payments route
// token
router.get("/braintree/token", braintreeTokenController);

// payment
router.get("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;

import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";

// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// post product
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "Name is required" });
      case !description:
        return res
          .status(500)
          .send({ success: false, message: "Description is required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, message: "price is required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, message: "category is required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, message: "quantity is required" });
      case !shipping:
        return res
          .status(500)
          .send({ success: false, message: "shipping is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "photo is required & should below 1mb",
        });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Product",
    });
  }
};

// get all products
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All Products",
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Error while getting all products",
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Error while getting a single product",
    });
  }
};

// get photo controller
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "Can't get photo",
      success: false,
    });
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "Name is required" });
      case !description:
        return res
          .status(500)
          .send({ success: false, message: "Description is required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, message: "price is required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, message: "category is required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, message: "quantity is required" });
      case !shipping:
        return res
          .status(500)
          .send({ success: false, message: "shipping is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "photo is required & should below 1mb",
        });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Product",
    });
  }
};

// filter products controller

export const filterProductsController = async (req, res) => {
  try {
    const { radio, checked } = req.body;
    console.log(radio);
    // making it to collect arguments
    let args = {};

    // if checked is not empty then it store category
    if (checked.length > 0) {
      args.category = checked;
    }

    // if radio is not empty then it sets range using mongoose greater than equals to and less than equals to
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    // after that it pass the argument into find()
    const products = await productModel.find(args);
    console.log(products);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error while filtering  ",
    });
  }
};

// product count controller
export const productCountController = async (req, res) => {
  try {
    const totalP = await productModel.find({}).estimatedDocumentCount();
    const total = Math.ceil(totalP / 8);
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      message: "error in counting product",
      success: false,
    });
  }
};

// product per page
export const productsPerPageController = async (req, res) => {
  try {
    const perPage = 8;
    // if page params is found then it added page no else default 1
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in product per page",
      error,
      success: false,
    });
  }
};

// search product controller

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    // res.status(200).send({
    //   result,
    //   success: true
    // })
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "error while searching",
    });
  }
};

// similar product controller
export const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(6)
      .populate("category");
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      message: "error in similar product api",
      error,
      success: false,
    });
  }
};

// Category wise product
export const categoryWiseProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in product wise product api",
    });
  }
};

// braintree token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send({ err });
      } else {
        res.send({ response });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// braintree payments
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    cart.map((i) => (total += total + i.price));
    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options:{
        submitForSettlement: true
      }
    },
    function(error, result){
      if(result){
        const order = new orderModel({
          products: cart, 
          payment: result, 
          buyer: req.user._id,
        }).save()
        res.json({ok: true})
      }else{
        res.status(500).send({error})
      }
    }
  )
  } catch (error) {
    console.log(error)
  }
};

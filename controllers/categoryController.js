import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "Category name is required!" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists!",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all category
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Categories",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while getting all category",
    });
  }
};

// get single category
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.findOne({ slug: slug });
    res.status(200).send({
      success: true,
      message: "Got single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "error when getting a single category",
    });
  }
};

// delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      category,
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "error deleting category",
    });
  }
};



import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // validations
    if (!name) {
      return res.send({ message: "name is required" });
    }

    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    if (!phone) {
      return res.send({ message: "phone is required" });
    }

    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    if (!address) {
      return res.send({ message: "address is required" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.send(500).send({
      success: false,
      message: "error in registration",
      err,
    });
  }
};

// POST login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invlid Email or Password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in login",
      err,
    });
  }
};

// forgot password POST
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required!" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "password is required" });
    }

    // check if email and answer is correct
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }

    // if correct then hashing new password
    const hashed = await hashPassword(newPassword);

    // if everything is correct then it update password
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  res.send("protected routes");
};

// update profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // password check
    if (password && password.length < 6) {
      return res.json({
        success: false,
        message: "Password is required and length must be greater than 6",
      });
    }
    // hashing password if present
    const hashedPassword = password ? await hashPassword(password) : undefined;

    //  updating user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );

    //  res back
    res.status(200).send({
      success: true,
      message: "Profile udpated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "error in update profile api",
    });
  }
};

// orders controller
export const ordersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);

    // res.status(200).send({
    //   orders
    // })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in orders api",
    });
  }
};

import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  ordersController,
  allOrderController,
  updateOrderStatusController
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//routing

// register || POST method
router.post("/register", registerController);

// login || POST
router.post("/login", loginController);

// test routes

router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth
router.get("/user-auth",requireSignIn, (req,res)=>{
  res.status(200).send({ok:true});
});

// protected admin route
router.get("/admin-auth",requireSignIn, isAdmin, (req,res)=>{
  res.status(200).send({ok:true});
})

// forget password || POST
router.post('/forgot-password',forgotPasswordController)

// update profile
router.put('/profile', requireSignIn, updateProfileController);

// orders
router.get('/orders',requireSignIn, ordersController)

// all orders
router.get('/all-orders', requireSignIn, isAdmin, allOrderController)

// update status
router.put('/order-status/:oid', requireSignIn, isAdmin, updateOrderStatusController);

export default router;

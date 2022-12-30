import express from "express";
// import {
//   getAdminOrders,
//   getMyOrders,
//   getOrderDetails,
//   paymentVerification,
//   placeOrder,
//   placeOrderOnline,
//   processOrder,
// } from "../controllers/order.js";
import {
  placeOrder,
  getMyOrders,
  getOrderDetails,
  getAdminOrders,
  processOrder,
  placeOrderOnline,
  paymentVerification,
} from "../controllers/order.js";
import { authorizeAdmin, isAuthenticated } from "../middleswares/auth.js";

const router = express.Router();

// router.post("/createorder", isAuthenticated, placeOrder);
router.post("/createorder", placeOrder); //for testing is Postman

router.post("/createorderonline", isAuthenticated, placeOrderOnline);

router.post("/paymentverification", isAuthenticated, paymentVerification);

router.get("/myorders", isAuthenticated, getMyOrders); // get all orders

router.get("/order/:id", isAuthenticated, getOrderDetails); // get specific order

// // Add Admin Middleware
router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);

export default router;

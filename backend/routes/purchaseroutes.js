import express from "express";
import { protect } from "../middleware/auth.js";
import { createOrder, verifyPayment } from "../controllers/PurchaseController.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify-payment", protect, verifyPayment);

export default router;

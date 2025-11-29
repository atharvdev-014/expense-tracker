import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addIncome,
  getIncomes,
  deleteIncome
} from "../controllers/incomeController.js";

const router = express.Router();

router.post("/", authMiddleware, addIncome);
router.get("/", authMiddleware, getIncomes);
router.delete("/delete-income/:id", authMiddleware, deleteIncome);

export default router;


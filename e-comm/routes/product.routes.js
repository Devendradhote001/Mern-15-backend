import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  updateSingleProductValueController,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.array('images', 5), createProductController);
router.get("/", getAllProductsController);
router.get("/:productId", getSingleProductController);
router.put("/update/:productId", authMiddleware, updateProductController);
router.patch(
  "/update-single/:productId",
  authMiddleware,
  updateSingleProductValueController
);
router.delete("/delete/:productId", authMiddleware, deleteProductController);

export default router;

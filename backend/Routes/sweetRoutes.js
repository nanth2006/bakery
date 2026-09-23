import express from "express";
import { addProduct, getProduct, updateProduct, deleteProduct } from "../controller/sweetController.js";

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getProduct", getProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
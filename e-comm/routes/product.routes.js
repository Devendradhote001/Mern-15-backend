import express from "express";

const router = express.Router();

router.post("/create");
router.get("/");
router.get("/:id");
router.put("/update/:id");
router.patch("/update-single/:id");
router.delete("/delete/:id");

export default router;

import express from "express";
import imageController from "../Controllers/imageController.js";

const router = express.Router();

router.post("/imagegenerator", imageController);

export default router;

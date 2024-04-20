import express from "express";
import { adminLogin, adminLoginPost } from "../controllers/adminData.js";
const router = express.Router();

router.get("/dashboard", adminLogin);
// router.get("/login", adminLoginPost )

export default router;

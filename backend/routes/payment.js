import  {stocksToAdd}  from "../controllers/stocksToAdd.js";
import express  from "express";

const router = express.Router();

router.post("/payment", stocksToAdd);

export default router;
import  {addInvestor, sendInvestor}  from "../controllers/investorsData.js";
import express  from "express";

const router = express.Router();

router.get("/", sendInvestor);
router.post("/", addInvestor);

export default router;
import express  from "express";
import{getUserDetails} from "../controllers/user.js";
import { verifyToken } from "../middlewares/authUser.js";

const router = express.Router();

/* READ */

router.get("/", verifyToken, getUserDetails );

router.get("/portfolio", verifyToken);

router.patch("/portfolio", verifyToken)


export default router
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { error } from "console";
import authRoutes from "./routes/auth.js";
import {register} from './controllers/auth.js';
import userRoutes from "./routes/user.js";
import stocksToAddRoute from "./routes/payment.js";
import adminRoute from "./routes/adminRoute.js";
import investorsRoute from "./routes/investorsRoute.js";
/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();


/* MIDDLEWARES */ 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/* ROUTES */


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/user/stocks", stocksToAddRoute);
app.use("/investors",investorsRoute)
app.use("/admin", adminRoute);





/* MONGODB SETUP */
const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL).then( ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server at http://localhost:${PORT}`);
    })
}).catch((error)=>{
    console.log(`${error} did not connect`);
})









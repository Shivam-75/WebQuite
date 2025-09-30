import express from "express";
import { config } from "dotenv";
import { db } from "./src/database/db.js";
import { UserRoute } from "./src/routes/user.routes.js";
import { postRoute } from "./src/routes/post.route.js";
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from 'cloudinary';
import cors from "cors"



config({
    path: "./.env"
})
cloudinary.config({
    cloud_name: process.env.CLOUDNARY,
    api_key: process.env.API_KEY_CLODUNARY,
    api_secret: process.env.API_SECREAT_KEY_CLODUNARY


});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://web-quite-r2rm.vercel.app",
        "https://web-quite-kr9s.vercel.app",
        "https://web-quite-vxg3.vercel.app"
            

    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE"]
}))

app.use("/api/user", UserRoute);
app.use("/api/user", postRoute);
app.get("/", (req, res) => {
    res.send("hello");
})


db().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
})

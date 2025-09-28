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
    cloud_name: 'dqguh7vcs',
    api_key: '877235684459949',
    api_secret: 'd_AOBFDBv0s9kgJ88Z-fe7cDcKk'


});
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods:["GET","POST","DELETE"]
}))

app.use("/api/user", UserRoute);
app.use("/api/user", postRoute);


db().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
})

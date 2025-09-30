import express from "express";
import { getdataregistraion, login, Logout, Registration, userLogin } from "../controllers/user.controller.js";
import { uploade } from "../middlewares/multer.js";
import { AuthMiddleware } from "../middlewares/Auth.middlewares.js"

export const UserRoute = express.Router();

// UserRoute.post("/registration", uploade.single("avatar"), Registration)
UserRoute.post("/registration", Registration)
UserRoute.post("/login", login)
UserRoute.get("/userdata", AuthMiddleware, userLogin);
UserRoute.delete("/logout", Logout);
UserRoute.get("/reguserdata", AuthMiddleware, getdataregistraion);
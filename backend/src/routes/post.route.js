import express from "express";
import { getQuites, postQuites, quiteDelte, userQutesOnly } from "../controllers/post.controller.js";
import { AuthMiddleware } from "../middlewares/Auth.middlewares.js";

export const postRoute = express.Router();
postRoute.post("/postquite", AuthMiddleware,postQuites)
postRoute.get("/getquite", getQuites)
postRoute.get("/getuserQuites", AuthMiddleware, userQutesOnly)
postRoute.delete("/deleteuserQuites/:id", AuthMiddleware, quiteDelte);
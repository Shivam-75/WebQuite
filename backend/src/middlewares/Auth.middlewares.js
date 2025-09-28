import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const AuthMiddleware = async (req, res, next) => {
    const { token } = req.cookies || {};
    try {
        if (!token) {
            return res.status(401).json({ message: "No token found", success: false });
        }
        const userVerify = await jwt.verify(token, process.env.SecreatKey);

        const userverifyUser = await User.findOne({ email: userVerify.email }).select({ password: 0 });

        if (!userverifyUser) {
            return res.status(401).json({ message: "Access denied ,Unauthorized http requrest ", success: false });
        }

        req.user = userverifyUser;
        req.token = token;
        req.userId = userverifyUser._id;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Server Error ", success: false, err });
    }
}
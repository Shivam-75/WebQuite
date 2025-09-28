import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

export const Registration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ error: "File is missing or invalid" });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields", success: false });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: "Email already in use", success: false });
        }

        const uploadResult = await cloudinary.uploader.upload(req.file.path);

        try {
            await fs.unlink(req.file.path);
            console.log("Deleted local file:", req.file.path);
        } catch (unlinkError) {
            console.error("Failed to delete file:", unlinkError);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            url: uploadResult.secure_url
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            // user: userRegister
        });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Server error during registration", success: false });
    }
};

//? login---

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Fill All Column", success: false });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User Not Exist Register ", success: false });
        }

        const checkPassword = await bcrypt.compare(password, userExist.password)
        if (!checkPassword) {
            return res.status(400).json({ message: "Credentail Login Error  ", success: false });
        }

        const Token = await jwt.sign({
            id: userExist._id,
            email: userExist.email,
            name: userExist.name
        }, process.env.SecreatKey, { expiresIn: "1d" });

        await res.cookie('token', Token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "User Login Successfully ", success: true, Token });


    } catch (err) {
        return res.status(500).json({ message: "Server error Login ", err });
    }
}

//? image show 
export const userLogin = async (req, res) => {
    try {

        const data = await req.user;
        if (!data) {
            return res.status(401).json({ message: "UnAuthorized access ", success: false });
        }
        return res.status(200).json({ message: "successfull data fatched ", success: true, data })
    } catch (err) {
        return res.status(500).json({ message: "Server error ", err: err.message });
    }
}

//? logout functionality;

export const Logout = async (req, res) => {
    try {

        const removerdata = res.clearCookie('token');
        if (!removerdata) {
            return res.status(400).json({ message: "Logout Faild ", success: false });
        }
        res.status(200).send({ message: 'Cookie cleared using cookie-parser!', success: true });

    } catch (err) {
        return res.status(500).json({
            message: "Server error from  Logout ",
            success: false
        })
    }
}

//? registration all data show

export const getdataregistraion = async (req, res) => {
    try {

        const response = await User.find().select({ password: 0, email:0});

        if (!response) {
            return res.status(400).json({ message: "Data not found ", success: false });
        }

        return res.status(200).json({ message: "Sucessfull data fetched ", success: true, response });


    } catch (err) {
        return res.status(500).json({ message: "Server error get all registration ", success: false });
    }
}
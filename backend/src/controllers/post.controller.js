import { Quites } from "../models/post.models.js";


//? post the quites

export const postQuites = async (req, res) => {
    const { title, body } = req.body;
    const { id } = req.user;

    try {

        if (!title || !body) {
            return res.status(400).json({ message: "Fill All Column..", success: false });
        }

        const data = await Quites.create({
            userId: id,
            body,
            title
        })

        return res.status(201).json({ message: "Post added successfully ", success: true, data });

    } catch (err) {
        return res.status(500).json({ message: "Server Quite Post Eror ", success: false });
    }
}


//? get user quite only

export const userQutesOnly = async (req, res) => {
    const { id } = req.user;


    try {
        const userPostes = await Quites.find({ userId: id });

        if (!userPostes) {
            return res.status(400).json({ message: "User Not Post Any Quites ", success: false, count:0 });
        }
        return res.status(201).json({ message: "Successfull Data fatched..", success: true, userPostes, count: userPostes.length });
    }
    catch (err) {
        return res.status(500).json({ message: "Server UserQuitesOnly Error ", success: false, err });
    }
}



//todo get all the quites
export const getQuites = async (req, res) => {
    try {
        const postQuite = await Quites.find().sort({ createdAt: -1 });
        if (!postQuite) {
            return res.status(400).json({ message: "User Not Post Any Quites ", success: false });
        }

        return res.status(200).json({ message: "Successfull data Fatched", success: true, postQuite,  });

    } catch (err) {
        return res.status(500).json({ message: "Server Post Error ", success: false, err });
    }
}


//? delete the post

export const quiteDelte = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ message: "Give me id ", success: false });
        }
        const Quitesdele = await Quites.findOneAndDelete({ _id: id });
        if (!Quitesdele) {
            return res.status(400).json({ message: "Post Not delete Try Again ", success: false });
        }
        return res.status(200).json({ message: "Successfull User Deleted ", success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error ", success: false });
    }
}



import multer from "multer";
import crypto  from "crypto"
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public")
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, byte) => {
            const fn = byte.toString("hex") + path.extname(file.originalname);
            cb(null, fn);
        })
    }
})
export const uploade = multer({ storage });
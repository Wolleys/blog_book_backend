const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const postDest = "src/uploads/posts";
        const profileDest = "src/uploads/profile";
        const dest = file.fieldname === "post" ? postDest : profileDest;
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtName = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtName);
    },
});

const upload = multer({ storage });

module.exports = upload;

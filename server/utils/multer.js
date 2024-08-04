// dependencies 
import multer, { diskStorage } from "multer";

// create storage 
const storage = diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

// export middlewares 
export const mediaMulterMiddleWare = multer({storage}).array('media_files');

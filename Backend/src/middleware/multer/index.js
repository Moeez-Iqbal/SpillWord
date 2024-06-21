import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('Destination:', req.body.folder);
      const folder = req.body.folder;
      const dir = `uploads/${folder}`;
  
      // Create the folder if it doesn't exist
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      console.log('Original Filename:', file.originalname);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
// Initialize upload
const upload = multer({ storage: storage });

export default upload;

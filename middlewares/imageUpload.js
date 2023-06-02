const multer = require('multer');

// Set up multer storage and file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format'));
    }
  },
}).single('plat_image'); // Specify the field name for the image

module.exports = upload;

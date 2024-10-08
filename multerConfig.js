// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve('upload/'));
//     },
//     filename: function (req, file, cb) {
//       const fileName = `${Date.now()}-${file.originalname}`;
//       cb(null, fileName);
//     }
//   });
  
  
//   const upload = multer({ storage: storage });

//   module.exports = upload;


const multer = require('multer');

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;

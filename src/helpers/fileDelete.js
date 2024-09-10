const path = require('path');
const fs = require('fs');

const rootPath = path.resolve('./');

const handleFileDelete = fileName => {
  const filePath = `${rootPath}/public/uploads/${fileName}`;
  if (!fs.existsSync(filePath)) return true;
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) {
        console.log({ err });
        reject(err);
      }
      resolve(true);
    });
  });
};

module.exports = {
  handleFileDelete,
};

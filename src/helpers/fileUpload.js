const path = require('path');
const fs = require('fs');

const rootPath = path.resolve('./');

const handleFileUpload = file => {
  let { filename } = file.hapi;
  filename = `${Date.now()}_${filename}`;
  const dir = `${rootPath}/public/uploads`;

  // Create dir if not exits
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = `${dir}/${filename}`;
  const data = file._data;
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        console.log({ err });
        reject(err);
      }
      resolve(filename);
    });
  });
};

module.exports = {
  handleFileUpload,
};

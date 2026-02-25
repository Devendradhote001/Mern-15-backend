const Imagekit = require("imagekit");

const storageInstance = new Imagekit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL,
});

let sendFilesToIk = async (file, fileName) => {
  return await storageInstance.upload({
    file,
    fileName,
    folder: "Insta-back",
  });
};

module.exports = sendFilesToIk;

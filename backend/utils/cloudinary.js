const cloudinary = require("cloudinary").v2;

// ✅ Make sure ENV variables are set
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve(null);

    cloudinary.uploader
      .upload_stream(
        {
          folder: "notebook",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            return reject(error);
          }

          // ✅ RETURN ONLY URL
          resolve(result.secure_url);
        }
      )
      .end(fileBuffer); // 🔥 IMPORTANT
  });
};

module.exports = uploadOnCloudinary;
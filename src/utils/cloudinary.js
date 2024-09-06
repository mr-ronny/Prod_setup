import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// CLOUDINARY Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File is uploaded on cloudinary", response.url);

        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Log the error for debugging
        console.error("Error uploading to Cloudinary:", error);

        // Remove the locally saved temporary file as the upload operation failed
        if (localFilePath) {
            fs.unlink(localFilePath, (err) => {
                if (err) {
                    console.error("Error deleting local file:", err);
                } else {
                    console.log("Local file deleted successfully");
                }
            });
        }
        return null;
    }
};

export { uploadOnCloudinary };

import {v2 as cloudinary} from "cloudinary";
import { config } from "dotenv";

export const CLOUDINARY_CLOUD_NAME="dqjwz1z2a";
export const CLOUDINARY_API_KEY="448117447997834";
export const CLOUDINARY_API_SECRETE="Mt9QzS-79buA1bTHbfEvFQKdK_4";

config();

cloudinary.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRETE
})

export default cloudinary;
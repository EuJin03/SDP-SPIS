import { config } from "dotenv";
config();

export const __node_env = process.env.NODE_ENV;
export const __port = process.env.PORT;

export const __jwt_secret = process.env.JWT_SECRET;
export const __jwt_expiry_login = process.env.JWT_EXPIRY_LOGIN;
export const __jwt_expiry_password = process.env.JWT_EXPIRY_PASSWORD;
export const __proxy = process.env.PROXY;

export const __salt = process.env.SALT;

export const __url = process.env.URL;
export const __mailgun_domain = process.env.DOMAIN;
export const __mailgun_api_key = process.env.MAILGUN_API_KEY;

export const __mongo_uri = process.env.MONGO_URI;

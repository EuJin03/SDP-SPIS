import jwt from "jsonwebtoken";
import {
  __jwt_expiry_login,
  __jwt_expiry_password,
  __jwt_secret,
} from "../constant.js";

export const generateToken = id => {
  return jwt.sign({ id }, __jwt_secret, {
    expiresIn: __jwt_expiry_login,
  });
};

export const generateForgotPasswordToken = id => {
  return jwt.sign({ id }, __jwt_secret, {
    expiresIn: __jwt_expiry_password,
  });
};

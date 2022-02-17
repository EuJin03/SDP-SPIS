import jwt from "jsonwebtoken";

export const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

export const generateForgotPasswordToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.verify(token, process.env.JWT_SECRET); //decoded

      req.student = await Student.findById(id).select("-password"); //important

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

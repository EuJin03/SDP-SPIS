import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";

// Student auth
export const protectStudent = asyncHandler(async (req, res, next) => {
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

// Staff auth
export const protectStaff = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.verify(token, process.env.JWT_SECRET); //decoded

      req.staff = await Staff.findById(id).select("-password"); //important

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

// Admin auth (staff)
export const admin = (req, res, next) => {
  if (req.staff && req.staff.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

// Lecturer auth (staff)
export const lecturer = (req, res, next) => {
  if (req.staff) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a staff");
  }
};

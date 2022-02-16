import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Student from "../models/Student.js";
import { validateRegisterInput } from "../utils/validator.js";

// @desc Login user and get auth token
// @route POST /api/students/login
// @access Public route
const authStudent = asyncHandler(async (req, res) => {
  const { studentID, password } = req.body;

  const student = await Student.findOne({ studentID });

  if (student && (await student.matchPassword(password))) {
    res.json({
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get user profile
// @route GET /api/student/profile
// @access Public route
const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);

  if (student) {
    res.json({
      studentID: student.studentID,
      image: student.image,
      fname: student.fName,
      lname: student.lName,
      email: student.email,
      gender: student.gender,
      dob: student.dob,
      course: student.course,
      assignments: student.assignments,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Register a new user
// @route POST /api/register
// @access Public route
const registerStudent = asyncHandler(async (req, res) => {
  const {
    fName,
    lName,
    email,
    password,
    confirmPassword,
    dob,
    gender,
    course,
  } = req.body;

  if (email) {
    const validEmail = email.slice(0, 2).toUpperCase() + email.slice(2);

    const userExists = await Student.findOne({ email: validEmail });

    if (userExists) {
      res.status(400);
      throw new Error("Student already Exist");
    }

    const { valid, errors } = validateRegisterInput(
      fName,
      lName,
      validEmail,
      gender,
      password,
      confirmPassword,
      course
    );

    if (!valid) {
      res.status(400).json(errors);
    }

    const student = await Student.create({
      studentID: "TP" + validEmail.slice(2, 8),
      fName: fName,
      lName: lName,
      email: validEmail,
      password: password,
      dob: dob,
      gender: gender,
      course: course,
    });

    if (student) {
      res.status(201).json({
        studentID: student.studentID,
        image: student.image,
        fname: student.fName,
        lname: student.lName,
        email: student.email,
        gender: student.gender,
        dob: student.dob,
        course: student.course,
        assignments: student.assignments,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400);
    throw new Error("Empty columns");
  }
});

export { authStudent, getStudentProfile, registerStudent };

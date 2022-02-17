import { config } from "dotenv";
config();
import asyncHandler from "express-async-handler";
import {
  generateToken,
  generateForgotPasswordToken,
} from "../utils/generateToken.js";
import Student from "../models/Student.js";
import { validateRegisterInput } from "../utils/validator.js";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

const __domain = process.env.DOMAIN;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: __domain,
});

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

// @desc forgot student password
// @route POST /api/student/forgot-password
// @access Private route
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Invalid input");
  }

  const student = await Student.findOne({ email });

  if (!student) {
    res.status(401);
    throw new Error("That email is not registered");
  }

  const token = generateForgotPasswordToken(student.id);

  if (token) {
    const data = {
      from: "TP061195@mail.apu.edu.my",
      to: email,
      subject: "Reset Password Link",
      html: `<h2>Please click on given link to reset your password</h2>
                <p><a href="${process.env.URL}/api/student/reset-password/${token}">Reset Password</a></p>
                <hr>
                <p><b>The link will expire in 30m!</b></p>
              `,
    };

    student.resetToken = token;
    student.save();

    mg.messages().send(data, (err, body) => {
      if (err) {
        console.log(err);
      }
      res.status(204).json({
        message: "Reset link has been sent to your email.",
      });
    });
  } else {
    res.status(404);
    throw new Error(
      "Something went wrong when generating reset password token"
    );
  }
});

// @desc reset student password
// @route PATCH /api/student/reset-password/:token
// @access Private route
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params.token;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(404);
    throw new Error("Password do not match");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      res.status("401");
      throw new Error("Not authorised, token failed");
    }

    const student = await Student.findOne({ resetToken: token });

    if (!student) {
      res.status(404);
      throw new Error("User not found");
    }

    student.password = password;
    student.resetToken = undefined;
    await student.save();

    res.status(204).json({
      message: "Password has been reset successfully.",
    });
  });
});

// @desc Update student details
// @route PUT /api/student/:id
// @access Private route
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    student.fName = req.body.fName || student.fName;
    student.lName = req.body.lName || student.lName;
    student.dob = req.body.dob || student.dob;
    student.course = req.body.course || student.course;
  }
});

// @desc Get students detail
// @route GET /api/student/all
// @access Public access

export {
  authStudent,
  getStudentProfile,
  registerStudent,
  forgotPassword,
  resetPassword,
};

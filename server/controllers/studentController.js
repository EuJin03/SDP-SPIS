import asyncHandler from "express-async-handler";
import {
  generateToken,
  generateForgotPasswordToken,
} from "../utils/generateToken.js";
import Student from "../models/Student.js";
import {
  validateCourse,
  validatePassword,
  validateStudentRegisterInput,
} from "../utils/validator.js";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";
import {
  __jwt_secret,
  __mailgun_api_key,
  __mailgun_domain,
  __url,
} from "../constant.js";

const __domain = __mailgun_domain;
const mg = mailgun({
  apiKey: __mailgun_api_key,
  domain: __domain,
});
import mongoose from "mongoose";

// @desc Login student and get auth token
// @route POST /api/students/login
// @access Public route
const authStudent = asyncHandler(async (req, res) => {
  const { studentID, password } = req.body;

  const student = await Student.findOne({ studentID });

  if (student && (await student.matchPassword(password))) {
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
      isActive: student.isActive,
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get student profile
// @route GET /api/student/profile
// @access Public route
const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id).select("-password");

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
      isActive: student.isActive,
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
    const validEmail = email.slice(0, 2).toLowerCase() + email.slice(2);

    if (course.length < 12) {
      res.status(400);
      throw new Error("Course ID is not valid");
    }

    const validCourse = mongoose.Types.ObjectId(course);

    const userExists = await Student.findOne({ email: validEmail });

    if (userExists) {
      res.status(400);
      throw new Error("Student already Exist");
    }

    const { valid, errors } = validateStudentRegisterInput(
      fName,
      lName,
      validEmail,
      gender,
      password,
      confirmPassword,
      validCourse
    );

    if (!valid) {
      res.status(400);
      throw new Error(errors[Object.keys(errors)[0]]);
    }

    const student = await Student.create({
      studentID: "TP" + validEmail.slice(2, 8),
      fName: fName.charAt(0).toUpperCase() + fName.slice(1),
      lName: lName.charAt(0).toUpperCase() + lName.slice(1),
      email: validEmail.toLowerCase(),
      password: password,
      dob: dob,
      gender: gender,
      course: validCourse,
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
        isActive: student.isActive,
        token: generateToken(student._id),
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

  const student = await Student.findOne({ email }).select("-password");

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
                <p><a href="${__url}/reset-password/student/${token}">Reset Password</a></p>
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
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(404);
    throw new Error("Password do not match");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }

  jwt.verify(token, __jwt_secret, async (err, data) => {
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
// @route PATCH /api/student/profile
// @access Private route
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);

  if (student) {
    student.fName = req.body?.fName || student.fName;
    student.lName = req.body?.lName || student.lName;
    student.image = req.body?.image || student.image;
    student.dob = req.body?.dob || student.dob;

    student.fName =
      student.fName.charAt(0).toUpperCase() + student.fName.slice(1);
    student.lName =
      student.lName.charAt(0).toUpperCase() + student.lName.slice(1);

    if (req.body?.oldPassword) {
      if (!(await student.matchPassword(req.body?.oldPassword))) {
        res.status(400);
        throw new Error("Password Invalid");
      }
    }

    if (req.body?.password) {
      const password = req.body.password,
        confirmPassword = req.body.confirmPassword;

      if (password !== confirmPassword) {
        res.status(400);
        throw new Error("New Passwords do not match");
      }

      student.password = req.body.password;
    }

    if (req.body?.course) {
      const vc = validateCourse(req.body.course);
      if (vc) {
        res.status(400);
        throw new Error(vc);
      }

      student.course = req.body.course;
    }

    if (req.body?.isActive) {
      student.isActive = req.body.isActive === "true" ? true : false;
    }

    const updatedStudent = await student.save();

    res.json({
      studentID: updatedStudent.studentID,
      image: updatedStudent.image,
      fname: updatedStudent.fName,
      lname: updatedStudent.lName,
      email: updatedStudent.email,
      gender: updatedStudent.gender,
      dob: updatedStudent.dob,
      course: updatedStudent.course,
      assignments: updatedStudent.assignments,
      isActive: updatedStudent.isActive,
      token: generateToken(updatedStudent._id),
    });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc Delete student
// @route DELETE /api/student/:id
// @access Private admin
// const deleteUser = asyncHandler(async (req, res) => {
//   const student = await Student.findById(req.params.id).select("-password");
//   if (student) {
//     await student.remove();
//     res.json({ message: "Student removed" });
//   } else {
//     res.status(404);
//     throw new Error("Student not found");
//   }
// });

// @desc Get all students
// @route GET /api/students
// @access Private lecturer/admin
// const getStudents = asyncHandler(async (req, res) => {
//   const student = await Student.find({}).select("-password");
//   res.json(student);
// });

// @desc Get student by ID
// @route GET /api/student/:id
// @access Private lecturer/admin
// const getStudentById = asyncHandler(async (req, res) => {
//   const student = await Student.findById(req.params.id).select("-password");

//   if (student) {
//     res.json(student);
//   } else {
//     res.status(404);
//     throw new Error("Student not Found");
//   }
// });

export {
  authStudent,
  getStudentProfile,
  registerStudent,
  forgotPassword,
  resetPassword,
  updateStudent,
  // deleteUser,
  // getStudents,
  // getStudentById,
};

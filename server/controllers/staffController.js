import { config } from "dotenv";
config();
import asyncHandler from "express-async-handler";
import {
  generateToken,
  generateForgotPasswordToken,
} from "../utils/generateToken.js";
import Staff from "../models/Staff.js";
import {
  validateArrayCourse,
  validatePassword,
  validateStaffRegisterInput,
} from "../utils/validator.js";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

const __domain = process.env.DOMAIN;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: __domain,
});

// @desc Login staff and get auth token
// @route POST /api/staff/login
// @access Public route
const authStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email });

  if (staff && (await staff.matchPassword(password))) {
    res.json({
      image: staff.image,
      fname: staff.fName,
      lname: staff.lName,
      email: staff.email,
      gender: staff.gender,
      dob: staff.dob,
      course: staff.course,
      token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get staff profile
// @route GET /api/staff/profile
// @access Public route
const getStaffProfile = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.staff._id);

  if (staff) {
    res.json({
      image: staff.image,
      fname: staff.fName,
      lname: staff.lName,
      email: staff.email,
      gender: staff.gender,
      dob: staff.dob,
      course: staff.course,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Register a new user
// @route POST /api/staff/
// @access Public route
const registerStaff = asyncHandler(async (req, res) => {
  const {
    fName,
    lName,
    email,
    password,
    confirmPassword,
    dob,
    gender,
    course, //array
  } = req.body;

  if (email) {
    const userExists = await Staff.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Staff already Exist");
    }

    const { valid, errors } = validateStaffRegisterInput(
      fName,
      lName,
      email,
      gender,
      password,
      confirmPassword,
      course
    );

    if (!valid) {
      res.status(400);
      throw new Error(errors[Object.keys(errors)[0]]);
    }

    const staff = await Staff.create({
      fName: fName.charAt(0).toUpperCase() + fName.slice(1),
      lName: lName.charAt(0).toUpperCase() + lName.slice(1),
      email: email,
      password: password,
      dob: dob,
      gender: gender,
      course: course, //array
    });

    if (staff) {
      res.status(201).json({
        image: staff.image,
        fname: staff.fName,
        lname: staff.lName,
        email: staff.email,
        gender: staff.gender,
        dob: staff.dob,
        course: staff.course,
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

// @desc forgot staff password
// @route POST /api/staff/forgot-password
// @access Private route
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Invalid input");
  }

  const staff = await Staff.findOne({ email });

  if (!staff) {
    res.status(401);
    throw new Error("That email is not registered");
  }

  const token = generateForgotPasswordToken(staff.id);

  if (token) {
    const data = {
      from: "TP061195@mail.apu.edu.my",
      to: email,
      subject: "Reset Password Link",
      html: `<h2>Please click on given link to reset your password</h2>
                <p><a href="${process.env.URL}/api/staff/reset-password/${token}">Reset Password</a></p>
                <hr>
                <p><b>The link will expire in 30m!</b></p>
              `,
    };

    staff.resetToken = token;
    staff.save();

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

// @desc reset staff password
// @route PATCH /api/staff/reset-password/:token
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

    const staff = await Staff.findOne({ resetToken: token });

    if (!staff) {
      res.status(404);
      throw new Error("User not found");
    }

    staff.password = password;
    staff.resetToken = undefined;
    await staff.save();

    res.status(204).json({
      message: "Password has been reset successfully.",
    });
  });
});

// @desc Update staff details
// @route PATCH /api/staff/profile
// @access Private route
const updateStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.staff.id);

  if (staff) {
    staff.fName = req.body?.fName || staff.fName;
    staff.lName = req.body?.lName || staff.lName;
    staff.image = req.body?.image || staff.image;
    staff.dob = req.body.dob || staff.dob;

    staff.fName = staff.fName.charAt(0).toUpperCase() + staff.fName.slice(1);
    staff.lName = staff.lName.charAt(0).toUpperCase() + staff.lName.slice(1);

    if (req.body?.password) {
      const password = req.body.password,
        confirmPassword = req.body.confirmPassword;

      const vp = validatePassword(password, confirmPassword);
      if (vp) {
        res.status(400);
        throw new Error(vp);
      }

      staff.password = req.body.password;
    }

    if (req.body?.course) {
      //array
      const course = req.body.course;
      const vac = validateArrayCourse(course);
      if (vac) {
        res.status(400);
        throw new Error(vc);
      }

      let courses = [];
      course.forEach(c => {
        courses.push(c);
      });

      courses = [...new Set(courses)];
      staff.course = courses;
    }

    const updatedStaff = await staff.save();

    res.json({
      image: updatedStaff.image,
      fname: updatedStaff.fName,
      lname: updatedStaff.lName,
      email: updatedStaff.email,
      gender: updatedStaff.gender,
      dob: updatedStaff.dob,
      course: updatedStaff.course,
    });
  } else {
    res.status(404);
    throw new Error("Staff not found");
  }
});

// @desc Delete staff
// @route DELETE /api/staff/:id
// @access Private admin
const deleteUser = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (staff) {
    await staff.remove();
    res.json({ message: "Staff removed" });
  } else {
    res.status(404);
    throw new Error("Staff not found");
  }
});

export {
  authStaff,
  getStaffProfile,
  registerStaff,
  forgotPassword,
  resetPassword,
  updateStaff,
  deleteUser,
};

import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
// errors[Object.keys(errors)[0]]

export const validatePassword = (password, confirmPassword) => {
  if (password === "" || password.length < 8) {
    return "Password must contain at least 8 characters";
  } else if (password !== confirmPassword) {
    return "Password do not match";
  }

  return false;
};

export const validateCourse = course => {
  const courseExist = Course.exists({ id: course });

  if (!courseExist) {
    return "Course does not exist";
  }

  return false;
};

export const validateRegisterInput = (
  fName,
  lName,
  email,
  gender,
  password,
  confirmPassword,
  course
) => {
  const errors = {};

  // Name
  if (fName.trim() === "" || lName.trim() === "") {
    errors.name = "First name and Last name must not be blank";
  }

  // Email
  const regEx = /^TP[0-9]+@[a-zA-Z]+.apu.edu.my$/;
  if (!email.match(regEx)) {
    errors.email =
      "Email must be a valid email address from Asia Pacific University";
  }

  // Gender
  if (gender.trim() === "") {
    errors.gender = "Gender must not be empty";
  }

  // Password
  const vp = validatePassword(password, confirmPassword);
  if (vp) {
    errors.password = vp;
  }

  // Course
  const vc = validateCourse(course);
  if (vc) {
    errors.course = vc;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateAssignment = asg => {
  const assignmentExist = Assignment.exists({ id: asg });

  if (!assignmentExist) {
    return "Assignment does not exist";
  }

  return false;
};

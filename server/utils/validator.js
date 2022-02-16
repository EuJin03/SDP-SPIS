import Course from "../models/Course.js";

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
  if (password === "" || password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  } else if (password !== confirmPassword) {
    errors.password = "Password do not match";
  }

  // Course
  const courseExist = Course.exists({ id: course });

  if (!courseExist) {
    errors.course = "Course does not exist";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
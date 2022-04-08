import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
// errors[Object.keys(errors)[0]]

export const validatePassword = (password, confirmPassword) => {
  if (password === "" || password.length < 6) {
    return "Password must contain at least 6 characters";
  } else if (password !== confirmPassword) {
    return "Password do not match";
  }

  return false;
};

export const validateCourse = course => {
  if (course) {
    const courseExist = Course.findById(course);

    if (!courseExist) return "Course does not exist";
  }

  return false;
};

export const validateArrayCourse = async courses => {
  for (let i = 0; i < courses.length; i++) {
    const courseExist = await Course.findById(courses[i]);
    if (!courseExist) {
      return "Course does not Exist";
    }
  }
  return false;
};

export const validateStudentRegisterInput = (
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
  const regEx = /^tp[0-9]+@mail.apu.edu.my$/;
  if (!email.match(regEx)) {
    errors.email =
      "Email must be a valid STUDENT email address from Asia Pacific University";
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

export const validateStaffRegisterInput = async (
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
  const regEx = /^[a-zA-Z0-9._%+-]+@staffemail.apu.edu.my$/;
  if (!email.match(regEx)) {
    errors.email =
      "Email must be a valid STAFF email address from Asia Pacific University";
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
  const vac = await validateArrayCourse(course);
  if (vac) {
    errors.course = vac;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateURL = url => {
  const regEx =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (!url.match(regEx)) {
    return {
      valid: false,
      message: "Not a valid or secure URL",
    };
  }

  return {
    valid: true,
  };
};

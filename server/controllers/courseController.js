import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";

// @desc Get all course details
// @route GET /api/course
// @access Public route
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.find({});
  if (!course) {
    res.status(404);
    throw new Error("Courses do not exist.");
  }
  res.json(course);
});

// @desc Create new course
// @route POST /api/course
// @access Private admin
const createCourse = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  if (!courses) {
    res.status(404);
    throw new Error("Courses do not exist.");
  }

  const { courseName } = req.body;

  courses.forEach(course => {
    if (course.courseName.toLowerCase() !== courseName.toLowerCase()) {
    } else {
      res.status(401);
      throw new Error("Course already existed!");
    }
  });
});

// @desc Edit course & subjects
// @route PATCH /api/course/:id
// @route Private (admin)

export { getCourse };

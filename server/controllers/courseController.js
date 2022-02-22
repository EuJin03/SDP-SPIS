import asyncHandler from "express-async-handler";
import Assignment from "../models/Assignment.js";
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

  const assignments = await Assignment.find({});

  const subjectArr = [];
  assignments.forEach(assignment => {
    subjectArr.push({
      subjectId: assignment.subject.toString(),
      topicName: assignment.topicName,
    });
  });

  const reducedSubjectArr = subjectArr.reduce((r, { subjectId, topicName }) => {
    r[subjectId] = r[subjectId] || { subjectId, topicName: [] };
    r[subjectId].topicName.push(topicName);
    return r;
  }, {});

  console.log();

  res.json({
    topicArrayList: Object.values(reducedSubjectArr),
    courseList: course,
  });
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

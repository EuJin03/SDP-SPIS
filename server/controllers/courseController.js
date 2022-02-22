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

  res.json({
    topicArrayList: Object.values(reducedSubjectArr),
    courseList: course,
  });
});

// @desc Create new course
// @route POST /api/course
// @access Private admin
const createCourse = asyncHandler(async (req, res) => {
  const { courseName } = req.body;

  const courses = await Course.find({});

  if (!courses) {
    res.status(404);
    throw new Error("Courses do not exist.");
  }

  if (
    courses.find(
      course =>
        course.courseName.toLowerCase().replace(/\s/g, "") ===
        courseName.toLowerCase().replace(/\s/g, "")
    )
  ) {
    res.status(401);
    throw new Error("Course already existed");
  }

  const course = new Course({
    courseName: courseName,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @desc Edit course & subjects
// @route PATCH /api/course/:id
// @route Private (admin)
const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (course) {
    course.courseName = req.body.courseName || course.courseName;

    if (req.body?.subjectName) {
      const validate = course.subjects.find(
        subject =>
          subject.subjectName.toLowerCase().replace(/\s/g, "") ===
          req.body.subjectName.toLowerCase().replace(/\s/g, "")
      );

      if (!validate) {
        const subject = {
          subjectName: req.body.subjectName,
        };

        course.subjects.push(subject);
      } else {
        res.status(401);
        throw new Error("Subject already existed");
      }
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(401);
    throw new Error("Course does not exist");
  }
});

export { getCourse, createCourse, updateCourse };

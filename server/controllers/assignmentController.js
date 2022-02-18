import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";
import Staff from "../models/Staff.js";
import Student from "../models/Student.js";
import Assignment from "../models/Assignment.js";

// Lecturer
// ------------------------------------------------------
// @desc Lecturer view task uploaded
// @route GET /api/assignment/uploaded-task
// @access Private (lecturer only)
const viewTask = asyncHandler(async (req, res) => {
  const task = await Assignment.find({ uploadedBy: req.staff._id });

  if (!task) {
    res.status(400);
    throw new Error("Assignments not found");
  }

  res.json(task);
});

// @desc Assign task to student
// @route PATCH /api/assignment/assign-task/:id
// @access Private (lecturer only)
const assignTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Assignment.findById(id);

  if (!task) {
    res.status(400);
    throw new Error("Assignments not found");
  }

  if (new Date(task.due).toISOString() > new Date(Date.now()).toISOString()) {
    const students = await Student.find({});

    if (!students) {
      res.status(404);
      throw new Error("Student not found");
    }
    let updateStudent;
    const test = async students => {
      for (let i = 0; i < students.length; i++) {
        if (students[i].course.toString() === task.course.toString()) {
          const studentIndex = students[i]._id;

          updateStudent = await Student.findById(studentIndex);

          if (
            !updateStudent.assignments.find(
              asg => asg.assignment.toString() === id.toString()
            )
          ) {
            updateStudent.assignments.push({
              name: task.topicName,
              assignment: task._id,
            });
          }

          await updateStudent.save();
        }
      }
    };

    await test(students);
  }

  res.json("Task assigned to all students within the course successfully.");
});

// Student
// -------------------------------------------------------------------
// @desc View all assignment (student)
// @route GET /api/assignment
// @access Private (student only)
const viewStudentAssignment = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);

  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  res.json(student.assignments);
});

export { viewStudentAssignment, viewTask, assignTask };

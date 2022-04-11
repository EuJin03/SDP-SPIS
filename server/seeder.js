import mongoose from "mongoose";
import dotenv from "dotenv";

import students from "./data/students.js";
// import courses from "./data/courses.js";
import staffs from "./data/staffs.js";
import assignments from "./data/assignments.js";
import resources from "./data/resources.js";

import Student from "./models/Student.js";
import Course from "./models/Course.js";
import Staff from "./models/Staff.js";
import Assignment from "./models/Assignment.js";
import Resource from "./models/Resource.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // await Student.deleteMany();
    // await Resource.deleteMany();
    // await Course.deleteMany();
    // await Staff.deleteMany();
    // await Assignment.deleteMany();

    // await Student.insertMany(students);
    // await Resource.insertMany(resources);
    // await Course.insertMany(courses);
    // await Staff.insertMany(staffs);
    // await Assignment.insertMany(assignments);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Student.deleteMany();
    // await Course.deleteMany();
    await Staff.deleteMany();
    await Assignment.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

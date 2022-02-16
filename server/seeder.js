import mongoose from "mongoose";
import dotenv from "dotenv";
import students from "./data/students.js";
import courses from "./data/courses.js";
import Student from "./models/Student.js";
import Course from "./models/Course.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Student.deleteMany();

    await Student.insertMany(students);

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
    await Course.deleteMany();

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

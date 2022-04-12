import path from "path";
import { config } from "dotenv";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import studentRoute from "./routes/studentRoute.js";
import staffRoute from "./routes/staffRoute.js";
import courseRoute from "./routes/courseRoute.js";
import assignmentRoute from "./routes/assignmentRoute.js";
import resourceRoute from "./routes/resourceRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

import { __node_env, __port, __proxy } from "./constant.js";

config();
connectDB();
const app = express();

if (__node_env === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/v1/student", studentRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/assignment", assignmentRoute);
app.use("/api/v1/resource", resourceRoute);
app.use("/api/v1/uploads", uploadRoute);

const __dirname = path.resolve();

if (__node_env === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", " index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = __port || 5000;

app.listen(
  PORT,
  console.log(`Server is running in ${__node_env} mode on ${PORT}`)
);

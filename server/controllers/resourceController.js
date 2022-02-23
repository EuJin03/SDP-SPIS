import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";
import Resource from "../models/Resource.js";

// @desc View resources
// @route GET /api/resource?courseId=xxx
// @access Public route
const getResources = asyncHandler(async (req, res) => {
  const courseId = req.query?.courseId;

  if (!courseId) {
    res.status(401);
    throw new Error("Invalid URL provided");
  }

  const resources = await Resource.find({ course: courseId });

  if (!resources) {
    res.status(401);
    throw new Error("Resources not found");
  }

  let updatedResources = [];
  const pushCourseName = async resources => {
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(401);
      throw new Error("Course not found");
    }

    // for (let i = 0; i < resources.length; i++) {
    //   const mergeCourse = Object.assign(
    //     {
    //       courseName: course.courseName,
    //     },
    //     resources[i]._doc
    //   );

    //   updatedResources.push(mergeCourse);
    // }

    for (let i = 0; i < resources.length; i++) {
      let mergeCourse = Object.assign(
        {
          courseName: course.courseName,
        },
        resources[i]._doc
      );

      for (let j = 0; j < course.subjects.length; j++) {
        if (
          resources[i]._doc.subject.toString() ===
          course.subjects[j]._id.toString()
        ) {
          let merged = Object.assign(
            {
              subjectName: course.subjects[j].subjectName,
            },
            mergeCourse
          );

          updatedResources.push(merged);
        }
      }
    }
  };

  await pushCourseName(resources);

  res.json(updatedResources);
});

// @desc Create new resource
// @route POST /api/resource/
// @access Private (lecturer)
const createResource = asyncHandler(async (req, res) => {});

// @desc Edit resource
// @route PATCH /api/resource?courseId=xxx
// @access Private (lecturer)
const editResource = asyncHandler(async (req, res) => {});

// @desc Delete resource
// @route DELETE /api/resource?courseId=xxx
// @access Private (lecturer)
const deleteResource = asyncHandler(async (req, res) => {});

export { getResources, createResource, editResource, deleteResource };

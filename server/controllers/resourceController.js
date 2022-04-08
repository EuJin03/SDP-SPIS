import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";
import Resource from "../models/Resource.js";
import Staff from "../models/Staff.js";
import { validateURL } from "../utils/validator.js";

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

  let updatedCourse = [];
  const pushCourseName = async resources => {
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(401);
      throw new Error("Course not found");
    }

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

          updatedCourse.push(merged);
        }
      }
    }
  };

  await pushCourseName(resources);

  let updatedResources = [];
  const updated = async resources => {
    for (let i = 0; i < resources.length; i++) {
      const staff = await Staff.findById(resources[i].uploadedBy);

      if (staff) {
        const merged = Object.assign(
          {
            staffName: staff.lName + " " + staff.fName,
            staffEmail: staff.email,
          },
          resources[i]
        );

        updatedResources.push(merged);
      } else {
        updatedResources.push(resources[i]);
      }
    }
  };

  await updated(updatedCourse);

  res.json(updatedResources);
});

// @desc View resource details
// @route GET /api/resource/:resourceId
// @access Public route
const getResourceDetails = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;

  const resource = await Resource.findById(resourceId);

  if (!resource) {
    res.status(401);
    throw new Error("Resources not found");
  }

  let updatedResource = [];
  const pushCourseName = async resource => {
    const course = await Course.findById(resource.course);
    const merged = Object.assign(
      {
        courseName: course.courseName,
        subjectName: course.subjects.filter(
          s => s._id.toString() === resource.subject.toString()
        )[0].subjectName,
      },
      resource._doc
    );
    updatedResource.push(merged);
  };

  await pushCourseName(resource);

  let updatedResourceDetails = [];
  const updated = async resource => {
    for (let i = 0; i < resource.length; i++) {
      const staff = await Staff.findById(resource[i].uploadedBy);

      if (staff) {
        const merged = Object.assign(
          {
            staffName: staff.lName + " " + staff.fName,
            staffEmail: staff.email,
          },
          resource[i]
        );

        updatedResourceDetails.push(merged);
      } else {
        updatedResourceDetails.push(resource[i]);
      }
    }
  };

  await updated(updatedResource);

  res.json(updatedResourceDetails[0]);
});

// @desc Create new resource
// @route POST /api/resource
// @access Private (lecturer)
const createResource = asyncHandler(async (req, res) => {
  const { _id } = req.staff;
  const { course, subject, topicName, topicURL } = req.body;

  // validate URL
  const { valid, errors } = validateURL(topicURL);

  if (!valid) {
    res.status(400);
    throw new Error(errors[Object.keys(errors)[0]]);
  }

  // validate course and subject ids
  const courseDetails = await Course.findById(course);

  if (!courseDetails) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  const subjectValid = courseDetails.subjects.filter(
    s => s._id.toString() === subject.toString()
  );

  if (subjectValid.length === 0) {
    res.status(400);
    throw new Error("Subject does not exist");
  }

  const resource = new Resource({
    uploadedBy: _id,
    course: course,
    subject: subject,
    topicName: topicName,
    topicURL: topicURL,
  });

  await resource.save();
  res.status(201).json(`${topicName} has been created successfully`);
});

// @desc Edit resource
// @route PATCH /api/resource?resourceId=xxx
// @access Private (lecturer)
const editResource = asyncHandler(async (req, res) => {
  const { _id } = req.staff;
  const { resourceId } = req.query;
  const { course, subject, topicName, topicURL } = req.body;

  // validate URL
  const validate = validateURL(topicURL);

  if (!validate.valid) {
    res.status(400);
    throw new Error(validate.message);
  }

  // validate course and subject ids
  const courseDetails = await Course.findById(course);

  if (!courseDetails) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  const subjectValid = courseDetails.subjects.filter(
    s => s._id.toString() === subject.toString()
  );

  if (subjectValid.length === 0) {
    res.status(400);
    throw new Error("Subject does not exist");
  }

  const resource = await Resource.findById(resourceId);

  if (resource) {
    if (resource.uploadedBy.toString() === _id.toString()) {
      (resource.uploadedBy = _id),
        (resource.course = course),
        (resource.subject = subject),
        (resource.topicName = topicName),
        (resource.topicURL = topicURL);

      const updatedResource = await resource.save();
      res.json(updatedResource);
    }
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Delete resource
// @route DELETE /api/resource/:resourceId
// @access Private (lecturer)
const deleteResource = asyncHandler(async (req, res) => {
  const { resourceId } = req.query;

  const resource = await Resource.findById(resourceId);

  if (resource) {
    await resource.remove();
    res.json({ message: "Resource has been removed successfully" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getResources,
  getResourceDetails,
  createResource,
  editResource,
  deleteResource,
};

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  assignmentDetailsReducer,
  assignmentSubmitReducer,
  assignmentViewReducer,
  taskAssignReducer,
  taskCreateReducer,
  taskDeleteReducer,
  taskDetailsReducer,
  taskGradeReducer,
  taskListReducer,
  taskSubmissionReducer,
  taskUpdateReducer,
} from "./reducers/assignmentReducer";
import {
  resourceCreateReducer,
  resourceDeleteReducer,
  resourceDetailsReducer,
  resourceListReducer,
  resourceUpdateReducer,
} from "./reducers/resourceReducer";
import {
  courseCreateReducer,
  courseDetailsReducer,
  courseListReducer,
  courseNameReducer,
  courseUpdateReducer,
} from "./reducers/courseReducer";
import {
  fileUploadReducer,
  imageUploadReducer,
} from "./reducers/uploadReducer";
import {
  adminAssignReducer,
  allStaffReducer,
  userDetailsReducer,
  userForgotPasswordReducer,
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  taskList: taskListReducer,
  taskDetails: taskDetailsReducer,
  taskCreate: taskCreateReducer,
  taskUpdate: taskUpdateReducer,
  taskDelete: taskDeleteReducer,
  taskAssign: taskAssignReducer,
  taskSubmission: taskSubmissionReducer,
  taskGrade: taskGradeReducer,
  assignmentView: assignmentViewReducer,
  assignmentDetails: assignmentDetailsReducer,
  assignmentSubmit: assignmentSubmitReducer,
  resourceList: resourceListReducer,
  resourceDetails: resourceDetailsReducer,
  resourceCreate: resourceCreateReducer,
  resourceUpdate: resourceUpdateReducer,
  resourceDelete: resourceDeleteReducer,
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseCreate: courseCreateReducer,
  courseUpdate: courseUpdateReducer,
  courseNames: courseNameReducer,
  imageUpload: imageUploadReducer,
  fileUpload: fileUploadReducer,
  allStaff: allStaffReducer,
  adminAssign: adminAssignReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const courseInfoFromStorage = localStorage.getItem("courseInfo")
  ? JSON.parse(localStorage.getItem("courseInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  courseNames: { courseInfo: courseInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

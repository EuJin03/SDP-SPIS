import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  studentDetailsReducer,
  studentForgotPasswordReducer,
  studentLoginReducer,
  studentRegisterReducer,
  studentResetPasswordReducer,
  studentUpdateProfileReducer,
} from "./reducers/studentReducer";
import {
  staffDetailsReducer,
  staffForgotPasswordReducer,
  staffLoginReducer,
  staffRegisterReducer,
  staffResetPasswordReducer,
  staffUpdateProfileReducer,
} from "./reducers/staffReducer";
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
  courseUpdateReducer,
} from "./reducers/courseReducer";
import {
  fileUploadReducer,
  imageUploadReducer,
} from "./reducers/uploadReducer";

const reducer = combineReducers({
  userLogin: studentLoginReducer || staffLoginReducer,
  userDetails: studentDetailsReducer || staffDetailsReducer,
  userRegister: studentRegisterReducer || staffRegisterReducer,
  userUpdateProfile: studentUpdateProfileReducer || staffUpdateProfileReducer,
  userForgotPassword:
    studentForgotPasswordReducer || staffForgotPasswordReducer,
  userResetPassword: studentResetPasswordReducer || staffResetPasswordReducer,
  taskList: taskListReducer,
  taskDetails: taskDetailsReducer,
  taskCreate: taskCreateReducer,
  taskUpdate: taskUpdateReducer,
  taskDelete: taskDeleteReducer,
  taskAssign: taskAssignReducer,
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
  imageUpload: imageUploadReducer,
  fileUpload: fileUploadReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

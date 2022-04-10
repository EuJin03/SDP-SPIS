import {
  ASSIGN_TASK_FAIL,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_RESET,
  ASSIGN_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_RESET,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_RESET,
  DELETE_TASK_SUCCESS,
  DISPLAY_SUBMISSION_FAIL,
  DISPLAY_SUBMISSION_REQUEST,
  DISPLAY_SUBMISSION_SUCCESS,
  GRADE_TASK_FAIL,
  GRADE_TASK_REQUEST,
  GRADE_TASK_RESET,
  GRADE_TASK_SUCCESS,
  SINGLE_ASSIGNMENT_FAIL,
  SINGLE_ASSIGNMENT_REQUEST,
  SINGLE_ASSIGNMENT_SUCCESS,
  SINGLE_TASK_FAIL,
  SINGLE_TASK_REQUEST,
  SINGLE_TASK_SUCCESS,
  SUBMIT_ASSIGNMENT_FAIL,
  SUBMIT_ASSIGNMENT_REQUEST,
  SUBMIT_ASSIGNMENT_RESET,
  SUBMIT_ASSIGNMENT_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_RESET,
  UPDATE_TASK_SUCCESS,
  VIEW_ASSIGNMENT_FAIL,
  VIEW_ASSIGNMENT_REQUEST,
  VIEW_ASSIGNMENT_RESET,
  VIEW_ASSIGNMENT_SUCCESS,
  VIEW_TASK_FAIL,
  VIEW_TASK_REQUEST,
  VIEW_TASK_RESET,
  VIEW_TASK_SUCCESS,
} from "../constants/assignmentConstant";

// STAFF
export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case VIEW_TASK_REQUEST:
      return { loading: true, tasks: [] };
    case VIEW_TASK_SUCCESS:
      return { loading: false, tasks: action.payload };
    case VIEW_TASK_FAIL:
      return { loading: false, error: action.payload };
    case VIEW_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const taskDetailsReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case SINGLE_TASK_REQUEST:
      return { loading: true, task: {} };
    case SINGLE_TASK_SUCCESS:
      return { loading: false, task: action.payload };
    case SINGLE_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { loading: true };
    case CREATE_TASK_SUCCESS:
      return { loading: false, success: true };
    case CREATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const taskUpdateReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { loading: true };
    case UPDATE_TASK_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { loading: true };
    case DELETE_TASK_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const taskAssignReducer = (state = { studentAssigned: 0 }, action) => {
  switch (action.type) {
    case ASSIGN_TASK_REQUEST:
      return { loading: true };
    case ASSIGN_TASK_SUCCESS:
      return { loading: false, success: true, studentAssigned: action.payload };
    case ASSIGN_TASK_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const taskSubmissionReducer = (state = { submissions: [] }, action) => {
  switch (action.type) {
    case DISPLAY_SUBMISSION_REQUEST:
      return { loading: true };
    case DISPLAY_SUBMISSION_SUCCESS:
      return { loading: false, submissions: action.payload };
    case DISPLAY_SUBMISSION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskGradeReducer = (state = { submission: {} }, action) => {
  switch (action.type) {
    case GRADE_TASK_REQUEST:
      return { loading: true };
    case GRADE_TASK_SUCCESS:
      return { loading: false, success: true, submission: action.payload };
    case GRADE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case GRADE_TASK_RESET:
      return {};
    default:
      return state;
  }
};

// STUDENT
export const assignmentViewReducer = (state = { assignments: [] }, action) => {
  switch (action.type) {
    case VIEW_ASSIGNMENT_REQUEST:
      return { loading: true };
    case VIEW_ASSIGNMENT_SUCCESS:
      return { loading: false, assignments: action.payload };
    case VIEW_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case VIEW_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};
export const assignmentDetailsReducer = (
  state = { assignment: {} },
  action
) => {
  switch (action.type) {
    case SINGLE_ASSIGNMENT_REQUEST:
      return { loading: true };
    case SINGLE_ASSIGNMENT_SUCCESS:
      return { loading: false, assignment: action.payload };
    case SINGLE_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const assignmentSubmitReducer = (state = { submission: {} }, action) => {
  switch (action.type) {
    case SUBMIT_ASSIGNMENT_REQUEST:
      return { loading: true };
    case SUBMIT_ASSIGNMENT_SUCCESS:
      return { loading: false, success: true, submission: action.payload };
    case SUBMIT_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case SUBMIT_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};

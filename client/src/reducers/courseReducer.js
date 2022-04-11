import {
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_RESET,
  CREATE_COURSE_SUCCESS,
  SINGLE_COURSE_FAIL,
  SINGLE_COURSE_REQUEST,
  SINGLE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_RESET,
  UPDATE_COURSE_SUCCESS,
  VIEW_COURSENAME_FAIL,
  VIEW_COURSENAME_REQUEST,
  VIEW_COURSENAME_RESET,
  VIEW_COURSENAME_SUCCESS,
  VIEW_COURSE_FAIL,
  VIEW_COURSE_REQUEST,
  VIEW_COURSE_SUCCESS,
} from "../constants/courseConstant";

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case VIEW_COURSE_REQUEST:
      return { loading: true, ...state };
    case VIEW_COURSE_SUCCESS:
      return { loading: false, courses: action.payload };
    case VIEW_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case SINGLE_COURSE_REQUEST:
      return { loading: true, ...state };
    case SINGLE_COURSE_SUCCESS:
      return { loading: false, course: action.payload };
    case SINGLE_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { loading: true };
    case CREATE_COURSE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CREATE_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_COURSE_RESET:
      return {};
    default:
      return state;
  }
};

export const courseUpdateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case UPDATE_COURSE_REQUEST:
      return { loading: true };
    case UPDATE_COURSE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case UPDATE_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COURSE_RESET:
      return {};
    default:
      return state;
  }
};

export const courseNameReducer = (state = { courseInfo: [] }, action) => {
  switch (action.type) {
    case VIEW_COURSENAME_REQUEST:
      return { loading: true };
    case VIEW_COURSENAME_SUCCESS:
      return { loading: false, success: true, courseInfo: action.payload };
    case VIEW_COURSENAME_FAIL:
      return { loading: false, error: action.payload };
    case VIEW_COURSENAME_RESET:
      return { courseInfo: [] };
    default:
      return state;
  }
};

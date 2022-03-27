import {
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_DETAILS_RESET,
  STUDENT_LOGOUT,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_UPDATE_PROFILE_RESET,
  STUDENT_UPDATE_PROFILE_FAIL,
  STUDENT_UPDATE_PROFILE_SUCCESS,
  STUDENT_UPDATE_PROFILE_REQUEST,
  STUDENT_FORGOT_PASSWORD_REQUEST,
  STUDENT_FORGOT_PASSWORD_SUCCESS,
  STUDENT_FORGOT_PASSWORD_FAIL,
  STUDENT_RESET_PASSWORD_REQUEST,
  STUDENT_RESET_PASSWORD_SUCCESS,
  STUDENT_RESET_PASSWORD_FAIL,
} from "../constants/studentConstant";

export const studentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true };
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case STUDENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true };
    case STUDENT_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_DETAILS_RESET:
      return { user: {} };
    case STUDENT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const studentDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case STUDENT_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case STUDENT_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// forget
export const studentForgotPassword = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case STUDENT_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case STUDENT_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// reset
export const studentResetPassword = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case STUDENT_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case STUDENT_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// upload image

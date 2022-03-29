import {
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_DETAILS_RESET,
  STAFF_LOGOUT,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_DETAILS_FAIL,
  STAFF_REGISTER_REQUEST,
  STAFF_REGISTER_FAIL,
  STAFF_REGISTER_SUCCESS,
  STAFF_UPDATE_PROFILE_RESET,
  STAFF_UPDATE_PROFILE_FAIL,
  STAFF_UPDATE_PROFILE_SUCCESS,
  STAFF_UPDATE_PROFILE_REQUEST,
  STAFF_FORGOT_PASSWORD_REQUEST,
  STAFF_FORGOT_PASSWORD_SUCCESS,
  STAFF_FORGOT_PASSWORD_FAIL,
  STAFF_RESET_PASSWORD_REQUEST,
  STAFF_RESET_PASSWORD_SUCCESS,
  STAFF_RESET_PASSWORD_FAIL,
} from "../constants/staffConstant";

export const staffRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_REGISTER_REQUEST:
      return { loading: true };
    case STAFF_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case STAFF_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_LOGIN_REQUEST:
      return { loading: true };
    case STAFF_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case STAFF_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_DETAILS_RESET:
      return { user: {} };
    case STAFF_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const staffDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case STAFF_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STAFF_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case STAFF_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case STAFF_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case STAFF_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// forget
export const staffForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case STAFF_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case STAFF_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// reset
export const staffResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case STAFF_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case STAFF_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// upload image

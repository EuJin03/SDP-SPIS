import axios from "axios";
import {
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_RESET,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGOUT,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_UPDATE_PROFILE_FAIL,
  STUDENT_UPDATE_PROFILE_REQUEST,
  STUDENT_UPDATE_PROFILE_SUCCESS,
  STUDENT_FORGOT_PASSWORD_REQUEST,
  STUDENT_FORGOT_PASSWORD_SUCCESS,
  STUDENT_FORGOT_PASSWORD_FAIL,
  STUDENT_RESET_PASSWORD_REQUEST,
  STUDENT_RESET_PASSWORD_SUCCESS,
  STUDENT_RESET_PASSWORD_FAIL,
} from "../constants/studentConstant";

export const studentLogin = (email, password) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/student/login`,
      { email, password },
      config
    );

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const studentRegister =
  (studentID, image, fname, lname, email, gender, dob, course) =>
  async dispatch => {
    try {
      dispatch({
        type: STUDENT_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/student",
        { studentID, image, fname, lname, email, gender, dob, course },
        config
      );

      dispatch({
        type: STUDENT_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: STUDENT_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: STUDENT_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({ type: STUDENT_LOGOUT });
  dispatch({ type: STUDENT_DETAILS_RESET });
};

export const getStudentDetails = async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/student/profile`, config);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudentProfile = student => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/v1/student/profile`,
      student,
      config
    );

    dispatch({
      type: STUDENT_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const studentForgotPassword = email => async dispatch => {
  try {
    dispatch({
      type: STUDENT_FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/student/forgot-password",
      config
    );
    dispatch({
      type: STUDENT_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_FORGOT_PASSWORD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const studentResetPassword =
  (token, password, confirmPassword) => async dispatch => {
    try {
      dispatch({
        type: STUDENT_RESET_PASSWORD_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.patch(
        `/api/v1/student/reset-password/${token}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: STUDENT_RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_RESET_PASSWORD_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

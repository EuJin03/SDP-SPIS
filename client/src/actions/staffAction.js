import axios from "axios";
import {
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_REGISTER_FAIL,
  STAFF_REGISTER_REQUEST,
  STAFF_REGISTER_SUCCESS,
  STAFF_UPDATE_PROFILE_FAIL,
  STAFF_UPDATE_PROFILE_REQUEST,
  STAFF_UPDATE_PROFILE_SUCCESS,
  STAFF_FORGOT_PASSWORD_REQUEST,
  STAFF_FORGOT_PASSWORD_SUCCESS,
  STAFF_FORGOT_PASSWORD_FAIL,
  STAFF_RESET_PASSWORD_REQUEST,
  STAFF_RESET_PASSWORD_SUCCESS,
  STAFF_RESET_PASSWORD_FAIL,
} from "../constants/staffConstant";

export const staffLogin = (email, password) => async dispatch => {
  try {
    dispatch({
      type: STAFF_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/staff/login`,
      { email, password },
      config
    );

    dispatch({
      type: STAFF_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: STAFF_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const staffRegister =
  (staffID, image, fname, lname, email, gender, dob, course) =>
  async dispatch => {
    try {
      dispatch({
        type: STAFF_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/staff",
        { staffID, image, fname, lname, email, gender, dob, course },
        config
      );

      dispatch({
        type: STAFF_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: STAFF_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: STAFF_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getStaffDetails = async (dispatch, getState) => {
  try {
    dispatch({
      type: STAFF_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/v1/staff/profile`, config);

    dispatch({
      type: STAFF_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStaffProfile = staff => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAFF_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.patch(`/api/v1/staff/profile`, staff, config);

    dispatch({
      type: STAFF_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STAFF_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const staffForgotPassword = email => async dispatch => {
  try {
    dispatch({
      type: STAFF_FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/staff/forgot-password", config);
    dispatch({
      type: STAFF_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STAFF_FORGOT_PASSWORD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const staffResetPassword =
  (token, password, confirmPassword) => async dispatch => {
    try {
      dispatch({
        type: STAFF_RESET_PASSWORD_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.patch(
        `/api/v1/staff/reset-password/${token}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: STAFF_RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: STAFF_RESET_PASSWORD_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

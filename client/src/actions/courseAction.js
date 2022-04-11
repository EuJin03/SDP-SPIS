import axios from "axios";
import {
  VIEW_COURSE_REQUEST,
  VIEW_COURSE_SUCCESS,
  VIEW_COURSE_FAIL,
  SINGLE_COURSE_REQUEST,
  SINGLE_COURSE_SUCCESS,
  SINGLE_COURSE_FAIL,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  VIEW_COURSENAME_REQUEST,
  VIEW_COURSENAME_SUCCESS,
  VIEW_COURSENAME_FAIL,
} from "../constants/courseConstant";

export const courseListAction = () => async dispatch => {
  try {
    dispatch({
      type: VIEW_COURSE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/course`);

    dispatch({
      type: VIEW_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: VIEW_COURSE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const courseDetailsAction = id => async dispatch => {
  try {
    dispatch({
      type: SINGLE_COURSE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/course/${id}`);

    dispatch({
      type: SINGLE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SINGLE_COURSE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const courseCreateAction = course => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COURSE_REQUEST,
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

    const { data } = await axios.post(`/api/v1/course`, course, config);

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const courseUpdateAction =
  (id, course) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_COURSE_REQUEST,
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
        `/api/v1/course/${id}`,
        course,
        config
      );

      dispatch({
        type: UPDATE_COURSE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_COURSE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    }
  };

export const viewCourseNameAction = courses => async dispatch => {
  try {
    dispatch({
      type: VIEW_COURSENAME_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/course/find`,
      { courses: courses },
      config
    );

    dispatch({
      type: VIEW_COURSENAME_SUCCESS,
      payload: data,
    });

    localStorage.setItem("courseInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: VIEW_COURSENAME_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

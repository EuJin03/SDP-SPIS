import axios from "axios";
import {
  ASSIGN_TASK_FAIL,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DISPLAY_SUBMISSION_FAIL,
  DISPLAY_SUBMISSION_REQUEST,
  DISPLAY_SUBMISSION_SUCCESS,
  GRADE_TASK_FAIL,
  GRADE_TASK_REQUEST,
  GRADE_TASK_SUCCESS,
  SINGLE_ASSIGNMENT_FAIL,
  SINGLE_ASSIGNMENT_REQUEST,
  SINGLE_ASSIGNMENT_SUCCESS,
  SINGLE_TASK_FAIL,
  SINGLE_TASK_REQUEST,
  SINGLE_TASK_SUCCESS,
  SUBMIT_ASSIGNMENT_FAIL,
  SUBMIT_ASSIGNMENT_REQUEST,
  SUBMIT_ASSIGNMENT_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  VIEW_ASSIGNMENT_FAIL,
  VIEW_ASSIGNMENT_REQUEST,
  VIEW_ASSIGNMENT_SUCCESS,
  VIEW_TASK_FAIL,
  VIEW_TASK_REQUEST,
  VIEW_TASK_SUCCESS,
} from "../constants/assignmentConstant";

export const taskListAction = courseId => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEW_TASK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/v1/assignment/uploaded-task/c/${courseId}`,
      config
    );

    dispatch({
      type: VIEW_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: VIEW_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskDetailsAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: SINGLE_TASK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/v1/assignment/uploaded-task/${id}`,
      config
    );

    dispatch({
      type: SINGLE_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SINGLE_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskCreateAction = task => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_TASK_REQUEST,
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

    const { data } = await axios.post(
      `/api/v1/assignment/create-task`,
      task,
      config
    );

    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskUpdateAction = (task, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASK_REQUEST,
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
      `/api/v1/assignment/update-task/${id}`,
      task,
      config
    );

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskDeleteAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_TASK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/assignment/${id}`, config);

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskAssignAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASSIGN_TASK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/v1/assignment/assign-task/${id}`,
      {},
      config
    );

    dispatch({
      type: ASSIGN_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGN_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskSubmissionAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISPLAY_SUBMISSION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/v1/assignment/grade-paper?assignmentId=${id}`,
      config
    );

    dispatch({
      type: DISPLAY_SUBMISSION_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DISPLAY_SUBMISSION_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const taskGradeAction =
  (grade, studentID, asgID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GRADE_TASK_REQUEST,
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
        `/api/v1/assignment/grade-paper?studentID=${studentID}&assignmentId=${asgID}`,
        grade,
        config
      );

      dispatch({
        type: GRADE_TASK_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: GRADE_TASK_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    }
  };

// STUDENT
export const assignmentViewAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEW_ASSIGNMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/assignment/view-task`, config);

    dispatch({
      type: VIEW_ASSIGNMENT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: VIEW_ASSIGNMENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};
export const assignmentDetailsAction = asgId => async (dispatch, getState) => {
  try {
    dispatch({
      type: SINGLE_ASSIGNMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/v1/assignment/view-task/${asgId}`,
      config
    );

    dispatch({
      type: SINGLE_ASSIGNMENT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SINGLE_ASSIGNMENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};
export const assignmentSubmitAction =
  (submissionId, submissionURL) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBMIT_ASSIGNMENT_REQUEST,
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
        `/api/v1/assignment/submit-task/${submissionId}`,
        { submissionFile: submissionURL },
        config
      );

      dispatch({
        type: SUBMIT_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: SUBMIT_ASSIGNMENT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    }
  };

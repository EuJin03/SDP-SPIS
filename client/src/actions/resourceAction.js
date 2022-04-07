import axios from "axios";
import {
  VIEW_RESOURCE_REQUEST,
  VIEW_RESOURCE_SUCCESS,
  VIEW_RESOURCE_FAIL,
  SINGLE_RESOURCE_REQUEST,
  SINGLE_RESOURCE_SUCCESS,
  SINGLE_RESOURCE_FAIL,
  CREATE_RESOURCE_FAIL,
  CREATE_RESOURCE_REQUEST,
  CREATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAIL,
  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAIL,
} from "../constants/resourceConstant";

export const resourceListAction = course => async dispatch => {
  try {
    dispatch({
      type: VIEW_RESOURCE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/resource?courseId=${course}`);

    dispatch({
      type: VIEW_RESOURCE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: VIEW_RESOURCE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const resourceDetailsAction = id => async dispatch => {
  try {
    dispatch({
      type: SINGLE_RESOURCE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/resource/${id}`);

    dispatch({
      type: SINGLE_RESOURCE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SINGLE_RESOURCE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const resourceCreateAction = resource => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_RESOURCE_REQUEST,
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

    const { data } = await axios.post(`/api/v1/resource`, resource, config);

    dispatch({
      type: CREATE_RESOURCE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_RESOURCE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const resourceUpdateAction =
  (resource, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_RESOURCE_REQUEST,
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
        `/api/v1/resource?resourceId=${id}`,
        resource,
        config
      );

      dispatch({
        type: UPDATE_RESOURCE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_RESOURCE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    }
  };

export const resourceDeleteAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_RESOURCE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/v1/resource?resourceId=${id}`,
      config
    );

    dispatch({
      type: DELETE_RESOURCE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_RESOURCE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

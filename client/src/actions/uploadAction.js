import axios from "axios";
import {
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/uploadConstant";

export const uploadImageAction = image => async dispatch => {
  try {
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axios.post(
      `/api/v1/uploads/image`,
      formData,
      config
    );

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const uploadFileAction = file => async dispatch => {
  try {
    dispatch({
      type: UPLOAD_FILE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post(`/api/v1/uploads/file`, formData, config);

    dispatch({
      type: UPLOAD_FILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_FILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

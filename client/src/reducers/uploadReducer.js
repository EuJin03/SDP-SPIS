import {
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_RESET,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_RESET,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/uploadConstant";

export const imageUploadReducer = (state = { image: "" }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true, image: "" };
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_IMAGE_RESET:
      return { image: "" };
    default:
      return state;
  }
};

export const fileUploadReducer = (state = { file: "" }, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return { loading: true, file: "" };
    case UPLOAD_FILE_SUCCESS:
      return { loading: false, success: true, file: action.payload };
    case UPLOAD_FILE_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_FILE_RESET:
      return { file: "" };
    default:
      return state;
  }
};

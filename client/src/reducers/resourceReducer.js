import {
  CREATE_RESOURCE_FAIL,
  CREATE_RESOURCE_REQUEST,
  CREATE_RESOURCE_RESET,
  CREATE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAIL,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_RESET,
  DELETE_RESOURCE_SUCCESS,
  SINGLE_RESOURCE_FAIL,
  SINGLE_RESOURCE_REQUEST,
  SINGLE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAIL,
  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_RESET,
  UPDATE_RESOURCE_SUCCESS,
  VIEW_RESOURCE_FAIL,
  VIEW_RESOURCE_REQUEST,
  VIEW_RESOURCE_SUCCESS,
} from "../constants/resourceConstant";

export const resourceListReducer = (state = { resources: [] }, action) => {
  switch (action.type) {
    case VIEW_RESOURCE_REQUEST:
      return { loading: true, ...state };
    case VIEW_RESOURCE_SUCCESS:
      return { loading: false, resources: action.payload };
    case VIEW_RESOURCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resourceDetailsReducer = (state = { resource: {} }, action) => {
  switch (action.type) {
    case SINGLE_RESOURCE_REQUEST:
      return { loading: true, ...state };
    case SINGLE_RESOURCE_SUCCESS:
      return { loading: false, resource: action.payload };
    case SINGLE_RESOURCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resourceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RESOURCE_REQUEST:
      return { loading: true };
    case CREATE_RESOURCE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CREATE_RESOURCE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_RESOURCE_RESET:
      return {};
    default:
      return state;
  }
};

export const resourceUpdateReducer = (state = { resource: {} }, action) => {
  switch (action.type) {
    case UPDATE_RESOURCE_REQUEST:
      return { loading: true };
    case UPDATE_RESOURCE_SUCCESS:
      return { loading: false, success: true, resource: action.payload };
    case UPDATE_RESOURCE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_RESOURCE_RESET:
      return { resource: {} };
    default:
      return state;
  }
};

export const resourceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RESOURCE_REQUEST:
      return { loading: true };
    case DELETE_RESOURCE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_RESOURCE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_RESOURCE_RESET:
      return {};
    default:
      return state;
  }
};

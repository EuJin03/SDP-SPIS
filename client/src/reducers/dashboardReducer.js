import {
  ADD_REMINDER,
  REMOVE_REMINDER,
  REQUEST_REMINDER,
  VIEW_REMINDER,
} from "../constants/dashboardConstant";

export const reminderReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_REMINDER:
      return { loading: true };
    case VIEW_REMINDER:
      return { loading: false, success: false, reminder: action.payload };
    case ADD_REMINDER:
      return { loading: false, success: true, reminder: action.payload };
    case REMOVE_REMINDER:
      return { loading: false, success: true, reminder: action.payload };
    default:
      return state;
  }
};

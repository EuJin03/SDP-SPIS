import {
  ADD_REMINDER,
  REMOVE_REMINDER,
  REQUEST_REMINDER,
  RESET_REMINDER,
  VIEW_REMINDER,
} from "../constants/dashboardConstant";

export const viewReminder = id => async dispatch => {
  dispatch({
    type: RESET_REMINDER,
  });
  dispatch({
    type: REQUEST_REMINDER,
  });

  const item = localStorage.getItem("reminder".concat(id))
    ? JSON.parse(localStorage.getItem("reminder".concat(id)))
    : [];

  dispatch({ type: VIEW_REMINDER, payload: item });
};

export const addToReminder = (id, text) => async dispatch => {
  dispatch({
    type: REQUEST_REMINDER,
  });

  const item = localStorage.getItem("reminder".concat(id))
    ? JSON.parse(localStorage.getItem("reminder".concat(id)))
    : [];

  item.push(text);

  dispatch({
    type: ADD_REMINDER,
    payload: item,
  });

  localStorage.setItem("reminder".concat(id), JSON.stringify(item));
};

export const removeFromReminder = (userId, id) => async dispatch => {
  dispatch({
    type: REQUEST_REMINDER,
  });

  const item = localStorage.getItem("reminder".concat(userId))
    ? JSON.parse(localStorage.getItem("reminder".concat(userId)))
    : [];

  item.splice(id, 1);

  dispatch({
    type: REMOVE_REMINDER,
    payload: item,
  });

  localStorage.setItem("reminder".concat(userId), JSON.stringify(item));
};

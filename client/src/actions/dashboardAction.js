import {
  ADD_REMINDER,
  REMOVE_REMINDER,
  REQUEST_REMINDER,
  VIEW_REMINDER,
} from "../constants/dashboardConstant";

export const viewReminder = () => async dispatch => {
  dispatch({
    type: REQUEST_REMINDER,
  });

  const item = localStorage.getItem("reminder")
    ? JSON.parse(localStorage.getItem("reminder"))
    : [];

  dispatch({ type: VIEW_REMINDER, payload: item });
};

export const addToReminder = text => async dispatch => {
  dispatch({
    type: REQUEST_REMINDER,
  });

  const item = localStorage.getItem("reminder")
    ? JSON.parse(localStorage.getItem("reminder"))
    : [];

  item.push(text);

  dispatch({
    type: ADD_REMINDER,
    payload: item,
  });

  localStorage.setItem("reminder", JSON.stringify(item));
};

export const removeFromReminder = id => async dispatch => {
  dispatch({
    type: REQUEST_REMINDER,
  });

  const item = localStorage.getItem("reminder")
    ? JSON.parse(localStorage.getItem("reminder"))
    : [];

  item.splice(id, 1);

  dispatch({
    type: REMOVE_REMINDER,
    payload: item,
  });

  localStorage.setItem("reminder", JSON.stringify(item));
};

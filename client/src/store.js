import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  studentDetailsReducer,
  studentLoginReducer,
} from "./reducers/studentReducer";
import {
  staffDetailsReducer,
  staffLoginReducer,
} from "./reducers/staffReducer";

const reducer = combineReducers({
  userLogin: studentLoginReducer || staffLoginReducer,
  userDetails: studentDetailsReducer || staffDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import { combineReducers } from "redux";
import { SET_LOGIN } from "../actionTypes/actionTypes";

const initialState = {
  loggedIn: false,
};
const reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return { ...state, loggedIn: true };
    }
    default: {
      return initialState;
    }
  }
};

const rootReducer = combineReducers({
  reducer1: reducer1,
});
export default rootReducer;

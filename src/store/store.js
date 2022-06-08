import { createStore } from "redux";
import rootReducer from "./reducers/reducer";
// creating store
const store = createStore(
  rootReducer,
  // this line will allow us to use redux dev tools for chrome extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// exporting store
export default store;

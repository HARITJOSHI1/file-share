import { combineReducers } from "redux";
import {reducer as formReducer} from "redux-form";
import { filesReducer } from "./filesReducer";

export default combineReducers({
  form: formReducer,
  files: filesReducer,
});

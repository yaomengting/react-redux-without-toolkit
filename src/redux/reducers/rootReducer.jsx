import filterReducer from "./filterReducer";
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  todos: todoReducer,
  filters: filterReducer
})

export default rootReducer;
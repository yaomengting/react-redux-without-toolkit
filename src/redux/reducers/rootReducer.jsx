import filterReducer from './filterReducer'
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
 
  todos: todoReducer,
  filter: filterReducer
})

export default rootReducer;
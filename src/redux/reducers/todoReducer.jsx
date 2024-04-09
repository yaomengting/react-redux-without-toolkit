import shortid from "shortid";
import todosAPI from "../mockAPI/todosAPI";
const todoAppState = {
  todos: [],
  filters: {
    status: "All",
    colors: []
  }
}

export default function todoReducer(state = todoAppState, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {...state, ...action.payload};
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case "TOGGLE_COLOR":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, color: action.payload.color } : todo
        )
      };
    case "CHANGE_STATUS_FILTER":
      return { ...state, filters: { ...state.filters, status: action.payload } };
    case "CHANGE_COLOR_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          colors: action.payload
        }
      };
    case "MARK_ALL_COMPLETED":
      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: true }))
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }

}

// export function addToDo(title, color) {
//   return { type: "ADD_TODO", payload: { id: shortid.generate(), title, color } }
// }

export const getTodosAsync = () => {
  return async (dispatch) => {
    const response = await todosAPI.getTodos();
   
    dispatch(setTodos(response.data))
  }
}

export const addTodoAsync = (title) => {
  return async (dispatch) => {
    const response = await todosAPI.addTodo(title);
    console.log("response.data: ", response.data);
    dispatch(addTodo(response.data))
  }
}

export const deleteTodoAsync = (id) => {
  return async (dispatch) => {
    const response = await todosAPI.deleteTodo(id);
    dispatch(deleteTodo(response.data));
  }
}

export const toggleCompleteAsync = (id) => {
  return async (dispatch) => {
    const response = await todosAPI.toggleComplete(id);
    dispatch(toggleComplete(response.data))
  }
}

export function toggleComplete(id) {
  return { type: "TOGGLE_COMPLETE", payload: { id } }
}

export function toggleColor(id, color) {
  return { type: "TOGGLE_COLOR", payload: { id, color } }
}

export function changeStatusFilter(status) {
  return { type: "CHANGE_STATUS_FILTER", payload: status }
}

export function changeColorFilter(colors) {
  return { type: "CHANGE_COLOR_FILTER", payload: colors }
}

export function markAllCompleted() {
  return { type: "MARK_ALL_COMPLETED" };
}

export function clearCompleted() {
  return { type: "CLEAR_COMPLETED" };
}

const setTodos = (todos) => ({
  type: "SET_TODOS",
  payload: todos
})

const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo
})

const deleteTodo = (todo) => ({
  type: "DELETE_TODO",
  payload: todo
})
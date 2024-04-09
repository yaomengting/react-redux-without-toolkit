import todosAPI from "../mockAPI/todosAPI";
const todos = []

export default function todoReducer(state = todos, action) {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.payload);
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_COMPLETE":
      return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        )
      ;
    case "TOGGLE_COLOR":
      return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, color: action.payload.color } : todo
        )
      ; 
    case "MARK_ALL_COMPLETED":
      return state.map(todo => ({ ...todo, completed: true }))
      ;
    case "CLEAR_COMPLETED":
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }

}

export const getTodosAsync = () => {
  console.log("getTodosAsync triggered...")
  return async (dispatch) => {
    console.log("getTodosAsync returned...")
    const response = await todosAPI.getTodos();
    dispatch(setTodos(response.data))
  }
}

export const addTodoAsync = (title) => {
  console.log(" addTodoAsync triggered...")
  return async (dispatch) => {
    console.log(" addTodoAsync returned...")
    const response = await todosAPI.addTodo(title);
    dispatch(addTodo(response.data))
  }
}

export const deleteTodoAsync = (id) => {
  console.log(" deleteTodoAsync triggered...")
  return async (dispatch) => {
    console.log(" deleteTodoAsync returned...")
    const response = await todosAPI.deleteTodo(id);
    dispatch(deleteTodo(response.data));
  }
}

export const toggleCompleteAsync = (id) => {
  console.log(" toggleCompleteAsync triggered...")
  return async (dispatch) => {
    console.log(" toggleCompleteAsync returned...")
    const response = await todosAPI.toggleComplete(id);
    dispatch(toggleComplete(response.data))
  }
}

export const toggleColorAsync = (id, color) => {
  console.log(" toggleColorAsync triggered...")
  return async (dispatch) => {
    console.log(" toggleColorAsync returned...")
    const response = await todosAPI.toggleColor(id, color);
    console.log("response: ", response)
    dispatch(toggleColor(response.data.id, response.data.color));
  }
}

export function toggleComplete(id) {
  return { type: "TOGGLE_COMPLETE", payload: { id } }
}

export function toggleColor(id, color) {
  return { type: "TOGGLE_COLOR", payload: { id, color } }
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
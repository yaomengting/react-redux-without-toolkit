import shortid from "shortid";
const todoAppState = {
  todos: [
    { id: 0, title: 'Learn React', completed: true },
    { id: 1, title: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, title: 'Build something fun!', completed: false, color: 'blue' }
  ],
  filters: {
    status: 'All',
    colors: []
  }
}

export default function todoReducer(state = todoAppState, action) {
  switch (action.type) {
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

export function addToDo(title, color) {
  return { type: "ADD_TODO", payload: { id: shortid.generate(), title, color } }
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
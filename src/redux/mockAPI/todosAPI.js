import shortid from "shortid";
import { toggleComplete } from "../reducers/todoReducer";

const initialState = {
  todos: [
    { id: shortid.generate(), title: "Learn about coding", completed: false, color: "" },
    { id: shortid.generate(), title: "Cook & clean", completed: false, color: "" },
    { id: shortid.generate(), title: "Eat", completed: false, color: "" },
    { id: shortid.generate(), title: "Sleep", completed: false, color: "" },
  ],
  filters: {
    status: 'All',
    colors: []
  }
};

const todosAPI = {
  getTodos: async ()=> {
    return {
      success: true,
      message: "Got todos and filters",
      data: structuredClone(initialState) 
    }
  },
  addTodo: async (title, color = '') => {
    const newTodo = {
      id: shortid.generate(),
      title,
      completed: false,
      color
    };
    initialState.todos.push(newTodo);
    return {
      success: true,
      message: "New To do added",
      data: newTodo
    }

  },
  deleteTodo: async (id) => {
    const index = initialState.todos.findIndex((todo) => todo.id === id);
    initialState.todos.splice(index, 1);
    return {
      success: true,
      message: "Todo deleted",
      data: id
    }
  },
  toggleComplete: async (id) => {
    const index = initialState.todos.findIndex((todo) => todo.id === id);
    initialState.todos[index].completed = !initialState.todos[index].completed;
    return {
      success: true,
      message: "Complete status toggled to opposite",
      data: id
    }
  }


}

export default todosAPI;
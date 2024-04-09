import shortid from "shortid";
import { markAllCompleted, toggleColor } from "../reducers/todoReducer";

const todos = [
    { id: shortid.generate(), title: "Learn about coding", completed: false, color: "" },
    { id: shortid.generate(), title: "Cook & clean", completed: false, color: "" },
    { id: shortid.generate(), title: "Eat", completed: false, color: "" },
    { id: shortid.generate(), title: "Sleep", completed: false, color: "" },
  ]


const todosAPI = {
  getTodos: async ()=> {
    return {
      success: true,
      message: "Got todos and filters",
      data: structuredClone(todos) 
    }
  },
  addTodo: async (title, color = '') => {
    const newTodo = {
      id: shortid.generate(),
      title,
      completed: false,
      color
    };
   todos.push(newTodo);
    return {
      success: true,
      message: "New To do added",
      data: newTodo
    }

  },
  deleteTodo: async (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    return {
      success: true,
      message: "Todo deleted",
      data: id
    }
  },
  toggleComplete: async (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].completed = !todos[index].completed;
    return {
      success: true,
      message: "Complete status toggled to opposite",
      data: id
    }
  },
  toggleColor: async (id, color) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].color = color;
    return {
      success: true,
      message: "Complete toggle color",
      data: {id, color}
    }
  },
  markAllCompleted: async()=>{
    todos.map(todo => ({ ...todo, completed: true }))
    return {
      success: true,
      message: "mark All To do Completed",
      data: todos
    }
  }
  


}

export default todosAPI;
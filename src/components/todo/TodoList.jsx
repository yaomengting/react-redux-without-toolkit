import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAsync, getTodosAsync, toggleColor, toggleColorAsync, toggleCompleteAsync } from '../../redux/reducers/todoReducer';

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters)
  console.log("todos: ", todos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const statusFilteredTodos = todos.filter(todo => {
    if (filters.status === 'All') return true;
    if (filters.status === 'Active') return !todo.completed;
    if (filters.status === 'Completed') return todo.completed;
    return false;
  });

  const colorFilteredTodos = filters.colors.length > 0
    ? todos.filter(todo => filters.colors.includes(todo.color))
    : todos;

  const filteredTodos = statusFilteredTodos.filter(todo => colorFilteredTodos.includes(todo));

  function handleDelete(todo) {
    dispatch(deleteTodoAsync(todo.id))
  }

  function handleToggleComplete(todo) {
    dispatch(toggleCompleteAsync(todo.id))
  }

  function handleToggleColor(todo, color) {
    dispatch(toggleColorAsync(todo.id, color))
  }

  return (
    <ul className='todo-list'>
    {filteredTodos.map(todo => {
      return (
        <li key={todo.id} className="todo-item">
          <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo)} />
          <div className="todo-text"> {todo.title}</div>

          <select value={todo.color} onChange={e => handleToggleColor(todo, e.target.value)}>
            <option value="">No color</option>
            <option value="purple">Purple</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
          </select>
          <button onClick={() => handleDelete(todo)}>delete</button>
        </li>
      )
    })}
  </ul>
  )
}

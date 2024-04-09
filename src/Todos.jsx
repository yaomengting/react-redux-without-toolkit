import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, toggleComplete, toggleColor, changeStatusFilter, changeColorFilter, markAllCompleted, clearCompleted } from './redux/reducers/todoReducer';
export default function Todos() {
  const { todos, filters } = useSelector((state) => state.todos);
  console.log("todos: ", todos)
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const incompleteTodosCount = todos.filter(todo => !todo.completed).length;

  const statusFilteredTodos = todos.filter(todo => {
    if (filters.status === 'All') return true;
    if (filters.status === 'Active') return !todo.completed;
    if (filters.status === 'Completed') return todo.completed;
    return false;
  });

  const colorFilteredTodos = selectedColors.length > 0
    ? todos.filter(todo => selectedColors.includes(todo.color))
    : todos;

  const filteredTodos = statusFilteredTodos.filter(todo => colorFilteredTodos.includes(todo));

  function handleDelete(todo) {
    dispatch({ type: "DELETE_TODO", payload: todo.id })
  }

  function handleAddToDo() {
    dispatch(addToDo(title, color))
  }
  function handleToggleComplete(todo) {
    dispatch(toggleComplete(todo.id))
  }

  function handleToggleColor(todo, color) {
    dispatch(toggleColor(todo.id, color))
  }

  function handleStatusFilterChange(e) {
    dispatch(changeStatusFilter(e.target.value))
  }

  function handleColorFilterChange(color) {
    const newSelectedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newSelectedColors);
    dispatch(changeColorFilter(newSelectedColors));
  }

  function handleMarkAllCompleted() {
    dispatch(markAllCompleted());
  }

  function handleClearCompleted() {
    dispatch(clearCompleted());
  }

  return (
    <div className="todoapp">
      <div className="input-container">
        <input className='new-todo' placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} />
        <button onClick={handleAddToDo}>Add a New To Do</button>
      </div>
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
      <footer className='footer'>
      <div className='actions'>
        <h5>Actions</h5>
        <div> <button className="button" onClick={handleMarkAllCompleted}>Mark All Completed</button></div>
        <div> <button className="button" onClick={handleClearCompleted}>Clear Completed</button></div>
     
      </div>
      <div className="remaining-todos"> 
      <h5>Remaining Todos</h5>
      <div>{incompleteTodosCount} items left</div>
      </div>
      <div className="filter-by-status">
  <h5>Filter by Status</h5>
  <div className="status-options">
    <label>
      <input type="radio" name="status" value="All" checked={filters.status === 'All'} onChange={handleStatusFilterChange} /> All
    </label>
    <label>
      <input type="radio" name="status" value="Active" checked={filters.status === 'Active'} onChange={handleStatusFilterChange} /> Active
    </label>
    <label>
      <input type="radio" name="status" value="Completed" checked={filters.status === 'Completed'} onChange={handleStatusFilterChange} /> Completed
    </label>
  </div>
</div>

      <div className="color-filters">
      <h5>Filter by Color</h5>
        {['purple', 'blue', 'green', 'orange', 'red'].map(color => (
          <div key={color}>
            <input
              type="checkbox"
              id={color}
              checked={filters.colors.includes(color)}
              onChange={() => {
                handleColorFilterChange(color)
              }}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>
      
    
      </footer>
    </div>
  )
}
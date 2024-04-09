import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleColor, markAllCompleted, clearCompleted, getTodosAsync, addTodoAsync, deleteTodoAsync, toggleCompleteAsync } from './redux/reducers/todoReducer';
import FilterStatus from './components/filter/FilterStatus';
import FilterColor from './components/filter/FilterColor';
import AddTodoForm from './components/todo/AddTodoForm';
export default function Todos() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters)
  console.log("todos: ", todos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
 
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
    dispatch(deleteTodoAsync(todo.id))
  }


  function handleToggleComplete(todo) {
    dispatch(toggleCompleteAsync(todo.id))
  }

  function handleToggleColor(todo, color) {
    dispatch(toggleColor(todo.id, color))
  }

  function handleMarkAllCompleted() {
    dispatch(markAllCompleted());
  }

  function handleClearCompleted() {
    dispatch(clearCompleted());
  }

  return (
    <div className="todoapp">
      <AddTodoForm />
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
      <FilterStatus />
      <FilterColor />
      
    
      </footer>
    </div>
  )
}
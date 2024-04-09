import React from 'react'
import FilterStatus from './components/filter/FilterStatus';
import FilterColor from './components/filter/FilterColor';
import AddTodoForm from './components/todo/AddTodoForm';
import TodoActionsPanel from './components/todo/TodoActionsPanel';
import RemainingTodos from './components/todo/RemainingTodos';
import TodoList from './components/todo/TodoList';
export default function TodoApp() {
  

  return (
    <div className="todoapp">
      <AddTodoForm />
      <TodoList />
      <footer className='footer'>
     <TodoActionsPanel />
     <RemainingTodos />
      <FilterStatus />
      <FilterColor />
      
    
      </footer>
    </div>
  )
}
import React from 'react'
import {useSelector } from 'react-redux';
export default function RemainingTodos() {
  const todos = useSelector((state) => state.todos)
  const incompleteTodosCount = todos.filter(todo => !todo.completed).length;
  return (
    <div className="remaining-todos"> 
      <h5>Remaining Todos</h5>
      <div>{incompleteTodosCount} items left</div>
      </div>
  )
}

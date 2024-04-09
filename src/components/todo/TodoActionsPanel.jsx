import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCompleted, markAllCompleted } from '../../redux/reducers/todoReducer';
export default function TodoActionsPanel() {
  const dispatch = useDispatch();
  function handleMarkAllCompleted() {
    dispatch(markAllCompleted());
  }

  function handleClearCompleted() {
    dispatch(clearCompleted());
  }
  return (
    <div className='actions'>
        <h5>Actions</h5>
        <div> <button className="button" onClick={handleMarkAllCompleted}>Mark All Completed</button></div>
        <div> <button className="button" onClick={handleClearCompleted}>Clear Completed</button></div>
     
      </div>
  )
}

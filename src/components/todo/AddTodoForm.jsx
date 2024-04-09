import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../../redux/reducers/todoReducer';
export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  function handleAddToDo() {
    dispatch(addTodoAsync(title))
  }

  
  return (
    <div className="input-container">
        <input className='new-todo' placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} />
        <button onClick={handleAddToDo}>Add a New To Do</button>
    </div>
  )
}

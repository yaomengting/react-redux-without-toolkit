import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusFilter } from '../../redux/reducers/filterReducer';

export default function FilterStatus(){
  const filters = useSelector((state) => state);
  const dispatch = useDispatch();
  function handleStatusFilterChange(e){
    dispatch(changeStatusFilter(e.target.value))
  }
  return (
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
  )
}
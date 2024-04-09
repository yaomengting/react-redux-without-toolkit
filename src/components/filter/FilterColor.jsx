import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeColorFilter } from '../../redux/reducers/filterReducer';

export default function FilterColor() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  function handleColorFilterChange(color) {
    const isSelected = filters.colors.includes(color);
    const newSelectedColors = isSelected
    ? filters.colors.filter(c => c !== color)
    : [...filters.colors, color];
    dispatch(changeColorFilter(newSelectedColors));
  }
  return (
    <div className="color-filters">
      <h5>Filter by Color</h5>
      <div>   {['purple', 'blue', 'green', 'orange', 'red'].map(color => (
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
      ))}</div>
    </div>

  )
}

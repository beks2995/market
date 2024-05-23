import React from 'react'
import './CategorySelect.css'

interface CategorySelectProps {
  categories: string[],
  value: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, value, onChange }) => {
  return (
    <select className='category' name="category" value={value} onChange={onChange}>
      <option value="">Выберите категорию</option>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  )
}

export default CategorySelect

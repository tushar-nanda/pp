import React from 'react';
import './Header.css';
import categories from './CategoriesList';

function Categories(props) {
  return (
    <div className='cat-container'>
      <div>
        <span className='pr-3 category' onClick={() => props.handleCategory && props.handleCategory(null)}>All Categories</span>
        {categories && categories.length > 0 && categories.map((item, index) => {
          return (
            <span key={index} onClick={() => props.handleCategory && props.handleCategory(item)} className='category'>{item}</span>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;

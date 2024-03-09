import React from 'react';
import './Header.css';
import categories from './CategoriesList';
import { useNavigate, useParams } from 'react-router-dom';

function Categories(props) {
  const navigate = useNavigate();
  
  return (
    <div className='cat-container'>
      <div>
        <span className='pr-3 category' onClick={() => navigate('/') && props.handleCategory && props.handleCategory(null)}>All Categories</span>
        {categories && categories.length > 0 && categories.map((item, index) => {
          return (
            <span key={index} onClick={() => navigate('/category/' + item)} className='category'>{item}</span>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;

import React from 'react';
import { Link } from '@reach/router';
import '../App.css';

const Navigation = props => {
  return (
    <nav>
      <div className='nav-links'>
        <Link to='/'>Home</Link>
      </div>
    </nav>
  );
};

export default Navigation;

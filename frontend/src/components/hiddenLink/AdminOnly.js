import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const AdminOnly = ({children}) => {
    const { user } = useSelector(state => state.auth);
    const userRole = user?.role;

    if (userRole === 'admin') {
        return children;
    }
    
  return (
      <section style={{ height: '80vh' }}>
          <div className="container">
              <h2>Permission denied</h2>
              <p>This page can only be viewed by "admin" user</p>
              <br />
              <Link to={'/'}>
                  <button className='--btn'>back to Home</button>
              </Link>
          </div>
          
    </section>
  )
}

export const AdminOnlyLink = ({children}) => {
    const { user } = useSelector(state => state.auth);
    const userRole = user?.role;

    if (userRole === 'admin') {
        return children;
    }
    return null;
}

export default AdminOnly
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <section style={{ height: '80vh' }}>
          <div className="--center-all">
              <h2>Page Not Found</h2>
              <p>The resource you are looking for cannot be found or does not exist</p>
              <br />
              <Link to={'/'}>
                  <button className='--btn'>back to Home</button>
              </Link>
          </div>
          
    </section>
  )
}

export default NotFound
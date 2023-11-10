import React from 'react';
import NavbarComponent from './Navbar';

function Summary() {
    return (    
        <div className="form-container">
          <NavbarComponent></NavbarComponent>
          <h1>Summary</h1>
          <div className='valid-message fixedBox'>
            <h4>Well done! =)</h4>
          </div>
        </div>
      );
}

export default Summary
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Write from './write';
import Read from './read';
import View from './view';
import Update from './upate'; 

function Home() {
  return (
    <div className='home'>
      <nav className='nav'>
        <Link to="/write">Write</Link><br />
        <Link to='/read'>Read</Link><br />
      </nav>
      <Routes>
        <Route path='/write' element={<Write />} />
        <Route path='/read' element={<Read />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
      <div>
        <h1>Welcome to the Home Page!</h1>
        <p>This is the default page of the application.</p>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import NewEmail from './Components/NewEmail';
import ProtectedRouteLogin from './Components/ProtectedRouteLogin';
import Homepage from './Pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';

function App() {
  const user = null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectedRouteLogin ><Homepage/></ProtectedRouteLogin>}></Route>
        <Route path='/' element={<NewEmail/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;


import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { themeContext } from './context/useThemeContext';
import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Password from './pages/Password';
import NotFound from './pages/NotFound/NotFound';
import { useAuthContext } from './hooks/authHooks';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  const {user}=useAuthContext();
  const theme=useContext(themeContext);
  const darkMode=theme.state.darkMode;


  return (
    <div className="App" style={{
      background: darkMode ? "#101726" : "",
      color: darkMode ? "white" : "",
    }}>
      <BrowserRouter>
      <div class="md:container md:mx-auto">
        <Navbar></Navbar>
        <Routes>

     
      <Route path='/' element={user?<Sidebar/>:<Navigate to='/Login'></Navigate>}></Route>
      <Route path='/Login' element={user?<Navigate to='/'></Navigate>:<Login></Login>}></Route>
      <Route path='/Password' element={user?<Navigate to='/'></Navigate>:<Password></Password>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
      <Route path='/Signup' element={user?<Navigate to='/'></Navigate>:<Signup></Signup>}></Route>

        </Routes>
      </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;

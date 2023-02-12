
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { themeContext } from './context/useThemeContext';
import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Sidebar></Sidebar>
  },
  {
    path:'Login',
    element:<Login></Login>
  },
  {
    path:'Signup',
    element:<Signup></Signup>
  }
  
])

function App() {
  const theme=useContext(themeContext);
  const darkMode=theme.state.darkMode;
  return (
    <div className="App" style={{
      background: darkMode ? "#101726" : "",
      color: darkMode ? "white" : "",
    }}>
      
      <div class="md:container md:mx-auto">
        <Navbar></Navbar>
      <div class="grid  grid-flow-col">
      <RouterProvider router={router}>
      <Sidebar></Sidebar></RouterProvider>
        {/* <NoteDetail></NoteDetail> */}
        </div>
        
      </div> 
    </div>
  );
}

export default App;

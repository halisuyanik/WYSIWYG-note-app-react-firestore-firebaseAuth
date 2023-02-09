
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import NoteDetail from './components/NoteDetail/NoteDetail';
import { themeContext } from './context/useThemeContext';
import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
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
      <Sidebar></Sidebar>
        {/* <NoteDetail></NoteDetail> */}
        </div>
        
      </div> 
    </div>
  );
}

export default App;

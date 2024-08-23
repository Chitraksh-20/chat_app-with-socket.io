import './App.css';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx'; // Import with an uppercase L
import Signup from './pages/signup/signup.jsx';
function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Home />  {/* Use uppercase L here as well */}
    </div>
  );
}

export default App;
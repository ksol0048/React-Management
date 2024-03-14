import { useState } from 'react';
import Customer from './components/Customer/Customer';
import Home from './components/Main/Home';
import Loginform from './components/Loginform/Loginform';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {isLoggedIn ? (
            <Route path="/home" element={<Home />} />
            ) : (
            <Route path="/" element={<Loginform onLogin={handleLogin} />} />
          )}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App

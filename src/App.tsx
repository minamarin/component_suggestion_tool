import ComponentSuggester from '../components/ComponentSuggester.tsx';
import './App.css';
import './responsive-textarea.css';
import './App.css';
import './responsive-textarea.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Typography } from '@visa/nova-react';
import { Button } from '@visa/nova-react';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useState } from 'react';

function App() {
  const [logoClickCount, setLogoClickCount] = useState(0);
  return (
    <Router>
      <div>
        {/* HEADER */}
        <header className='fixed top-0 left-0 w-full flex flex-col z-50'>
          {/* LOGO & BUTTONS SECTION - Responsive Flex */}
          <div
            className='flex items-center w-full py-4 justify-between px-6'
            style={{
              backgroundColor: 'transparent',
              padding: '20px 0',
              boxSizing: 'border-box',
            }}
          >
            {/* Logo aligned left */}
            <div className='flex items-center'>
              <Link to='/' onClick={() => setLogoClickCount((c) => c + 1)}>
                <img
                  src='visa.png'
                  alt='Visa Logo'
                  style={{
                    height: '35px',
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </div>

            {/* Flexible spacer for responsiveness */}
            <div style={{ flex: 1 }}></div>

            {/* Login/Signup buttons aligned right */}
            <div className='flex items-center' style={{ gap: '12px' }}>
              <Link to='/login'>
                <Button colorScheme='secondary'>Login</Button>
              </Link>
              <Link to='/signup'>
                <Button className='button-primary'>Sign Up</Button>
              </Link>
            </div>
          </div>

          <div
            className='mx-auto center animate-slide-in-right'
            style={{
              height: '1.2rem',
              width: '100%',
              maxWidth: '1200px',
              background:
                'linear-gradient(to right, transparent, #2563EB 20%, #2563EB 80%, transparent)',
            }}
          ></div>

          {/* Spacer */}
          <div
            className='w-screen'
            style={{
              height: '0.7rem',
            }}
          ></div>

          {/* Yellow Bar with fade on both ends */}
          <div
            className='mx-auto center animate-slide-in-left'
            style={{
              height: '1.2rem',
              width: '100%',
              maxWidth: '1000px',
              background:
                'linear-gradient(to right, transparent, #facc15 20%, #facc15 80%, transparent)',
            }}
          ></div>
        </header>

        {/* MAIN CONTENT */}
        <div
          key={logoClickCount}
          className='mx-auto mt-28 p-4 flex flex-col items-center text-center min-h-screen'
        >
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Typography variant='display-2'>
                    Component Suggester
                  </Typography>
                  <ComponentSuggester />
                </>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>

        {/* ANIMATIONS */}
        <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.7s ease-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.7s ease-out;
        }
      `}</style>
      </div>
    </Router>
  );
}

export default App;

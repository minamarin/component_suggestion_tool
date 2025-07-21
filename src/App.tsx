import ComponentSuggester from '../components/ComponentSuggester.tsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Typography } from '@visa/nova-react';
import { Button } from '@visa/nova-react';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div>
        {/* HEADER */}
        <header className='fixed top-0 left-0 w-full flex flex-col z-50'>
          {/* LOGO SECTION */}
          {/* <div style={{ width: '150px' }}></div> */}
          <div
            className='flex items-center w-full py-4'
            style={{
              // backgroundColor: '#ffffff',
              backgroundColor: 'transparent',
              padding: '20px 0', // Only vertical padding
            }}
          >
            {/* Centered logo */}
            <div className='flex justify-center'>
              <Link to='/'>
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

            {/* 850px spacer */}
            <div style={{ width: '950px' }}></div>

            {/* Login/Signup buttons */}
            <div className='flex' style={{ gap: '12px' }}>
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
        <div className='mx-auto mt-28 p-4 flex flex-col items-center text-center min-h-screen'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Typography variant='display-1'>
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

// function App() {
//   return (
//     <div>
//       {/* HEADER */}
//       <header className="fixed top-0 left-0 w-screen flex flex-col z-50">
//         <div
//           className="w-screen animate-slide-in-right"
//           style={{
//             backgroundColor: '#2563EB', // blue
//             height: '1.5rem',
//           }}
//         ></div>

//            <div
//           className="w-full"
//           style={{
//             height: '0.7rem',
//           }}
//         ></div>

//         <div
//           className="w-screen animate-slide-in-left"
//           style={{
//             backgroundColor: '#facc15', // yellow
//             height: '1.5rem',
//           }}
//         ></div>
//       </header>

//       {/* MAIN CONTENT */}
//       <div className="mx-auto mt-28 p-4 flex flex-col items-center text-center min-h-screen">
//         <Typography variant="display-1">Visa Component Suggester</Typography>
//         <ComponentSuggester />
//       </div>

//       {/* ANIMATIONS */}
//       <style>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
//         @keyframes slideInLeft {
//           from { transform: translateX(-100%); }
//           to { transform: translateX(0); }
//         }
//         .animate-slide-in-right {
//           animation: slideInRight 0.7s ease-out;
//         }
//         .animate-slide-in-left {
//           animation: slideInLeft 0.7s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;

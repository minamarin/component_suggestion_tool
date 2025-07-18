import ComponentSuggester from '../components/ComponentSuggester.tsx';
import { Typography } from '@visa/nova-react';

function App() {
  return (
    <div>
      {/* HEADER */}
      <header className='fixed top-0 left-0 w-screen flex flex-col z-50'>
        {/* LOGO SECTION */}
        <div
          className='w-screen flex items-center justify-center py-2 p-5'
          style={{
            // backgroundColor: '#ffffff',
            backgroundColor: 'transparent',
            padding: 20,
          }}
        >
          <img
            src='visa.png'
            alt='Visa Logo'
            className='block mx-auto'
            style={{ height: '30px', objectFit: 'contain', }}
          />
        </div>

        <div
          className='mx-auto center animate-slide-in-right'
          style={{
            height: '1.2rem',
            width: '1000px',
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
            width: '1000px',
            background:
              'linear-gradient(to right, transparent, #facc15 20%, #facc15 80%, transparent)',
          }}
        ></div>
      </header>

      {/* MAIN CONTENT */}
      <div className='mx-auto mt-28 p-4 flex flex-col items-center text-center min-h-screen'>
        <Typography variant='display-1'> Component Suggester</Typography>
        <ComponentSuggester />
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

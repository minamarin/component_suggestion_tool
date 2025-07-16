import ComponentSuggester from '../components/ComponentSuggester.tsx';

// function App() {
//   return (
//     <div className='max-w-3xl mx-auto mt-10 p-4'>
//       <h1 className='text-3xl font-bold mb-6'>Visa Component Suggester</h1>
//       <ComponentSuggester />
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <div className='mx-auto mt-10 p-4 flex flex-col items-center text-center'>
      <h1 className='text-3xl font-bold mb-6'>Visa Component Suggester</h1>
      <ComponentSuggester />
    </div>
  );
}

export default App;

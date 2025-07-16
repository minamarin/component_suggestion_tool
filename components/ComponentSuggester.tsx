import { useState } from 'react';
import componentsData from '../mockData/components.json';
import { DefaultButton } from './button';

type ComponentType = {
  name: string;
  description: string;
  keywords: string[];
  codeSnippet: string;
};

//DEFINE a React functional component called ComponentSuggester
const ComponentSuggester = () => {
  //INITIALIZE state:
  const [input, setInput] = useState('');
  const [suggestedComponents, setSuggestedComponents] = useState<
    ComponentType[]
  >([]);
  const [copied, setCopied] = useState<string | null>(null);

  //DEFINE a function 'handleSuggest':
  const handleSuggest = () => {
    //- CONVERT user input to lowercase
    const lowerInput = input.toLowerCase();
    //- FILTER componentsData:
    const matches = componentsData.filter((component) =>
      //For each component, if any of its keywords match the user input (case-insensitive), include it in the results and update the suggestedComponents list.
      component.keywords.some((keyword) => lowerInput.includes(keyword))
    );
    setSuggestedComponents(matches);
  };
  //DEFINE function handleCopy that takes 'snippet' and 'name' as parameters
  const handleCopy = async (snippet: string, name: string) => {
    try {
      // COPY 'snippet' text to the clipboard
      await navigator.clipboard.writeText(snippet);
      //SET 'copied' state to 'name' (to indicate which snippet was copied)
      setCopied(name);
      //AFTER 2 seconds, RESET 'copied' state back to null
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '2rem',
      }}
    >
      <textarea
        placeholder='Describe what UI you want...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ minHeight: '100px', padding: '0.5rem', fontSize: '1rem' }}
      />
      
      <DefaultButton onClick={handleSuggest}>Suggest Components</DefaultButton>

      {suggestedComponents.length > 0 && (
        <div
          style={{
            border: '1px solid gray',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <h3>Suggested Components:</h3>
          {suggestedComponents.map((component) => (
            <div key={component.name} style={{ marginBottom: '1.5rem' }}>
              <h4>{component.name}</h4>
              <pre>
                <code>{component.codeSnippet}</code>
              </pre>
              <DefaultButton
              //this is the copy button
                onClick={() =>
                  handleCopy(component.codeSnippet, component.name)
                }
                style={{ padding: '0.5rem', marginTop: '0.5rem' }}
              >
                {copied === component.name ? 'Copied!' : 'Copy to Clipboard'}
              </DefaultButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentSuggester;

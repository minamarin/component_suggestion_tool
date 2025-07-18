import { useState, useEffect } from 'react';
import componentsData from '../mockData/components.json';
import { Button } from '@visa/nova-react';
import { VisaCopyLow } from '@visa/nova-icons-react';

type ComponentType = {
  name: string;
  description: string;
  keywords: string[];
  codeSnippet: string;
};

// Cycling placeholder phrases
const phrases = [
  'Type here for VISA components suggestion…',
  'Describe the UI you’d like to build…',
  'What would you like to create today?',
  'Start typing to discover relevant Visa components…',
];

//DEFINE a React functional component called ComponentSuggester
const ComponentSuggester = () => {
  //INITIALIZE state:
  const [input, setInput] = useState('');
  const [suggestedComponents, setSuggestedComponents] = useState<
    ComponentType[]
  >([]);
  const [copied, setCopied] = useState<string | null>(null);
  // Typewriter states
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (charIndex < currentPhrase.length) {
      const typingTimeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 100); // Typing speed

      return () => clearTimeout(typingTimeout);
    } else {
      const nextPhraseTimeout = setTimeout(() => {
        setCharIndex(0);
        setTypedText('');
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000); // Pause after full phrase

      return () => clearTimeout(nextPhraseTimeout);
    }
  }, [charIndex, currentPhraseIndex]);

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
        alignItems: 'center', //  centers horizontally
        justifyContent: 'center', // optional: centers vertically
        // minHeight: '100vh',
        gap: '1rem',
        marginTop: '2rem',
        textAlign: 'center',
      }}
    >
      <textarea
        placeholder={typedText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          minHeight: '100px',
          width: '600px',
          padding: '1rem',
          fontSize: '1.1rem',
        }}
      />

      <Button onClick={handleSuggest}>Suggest Components</Button>

      {suggestedComponents.length > 0 && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <h3>Suggested Components:</h3>
          {suggestedComponents.map((component) => (
            <div
              key={component.name}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                backgroundColor: '#ffffff',
                maxWidth: '600px',
                textAlign: 'left',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Component Name:</p>
              <h4 style={{ marginBottom: '0.5rem' }}>{component.name}</h4>
              <pre
                style={{
                  backgroundColor: '#f7f7f7',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  overflowX: 'auto',
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Component Code Snippet:</p>
                <code>{component.codeSnippet}</code>
                <VisaCopyLow
                  aria-label='Copy to clipboard'
                  style={{
                    cursor: 'pointer',
                    width: '24px',
                    height: '24px',
                  }}
                  onClick={() =>
                    handleCopy(component.codeSnippet, component.name)
                  }
                />
              </pre>
              
              <div
                style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                
              >
                {/* <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Copy Code Snippet: </p> */}
                
                {copied === component.name && (
                  <span style={{ fontSize: '0.8rem', color: 'green' }}>
                    Copied!
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentSuggester;

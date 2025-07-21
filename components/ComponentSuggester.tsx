import { useState, useEffect } from 'react';
import { Button } from '@visa/nova-react';
import { VisaCopyLow } from '@visa/nova-icons-react';
import axios from 'axios';

type ComponentType = {
  name: string;
  description: string;
  keywords: string[];
  codeSnippet: string;
};

// ✅ Typewriter placeholder phrases
const phrases = [
  'Type here for VISA components suggestion…',
  'Describe the UI you’d like to build…',
  'What would you like to create today?',
  'Start typing to discover relevant Visa components…',
];

const ComponentSuggester = () => {
  const [input, setInput] = useState('');
  const [suggestedComponents, setSuggestedComponents] = useState<ComponentType[]>([]);
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');

  // ✅ Typewriter states
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // ✅ Fetch components.json from backend
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/components')
      .then((res) => setComponents(res.data))
      .catch((err) => console.error('Failed to fetch components:', err));
  }, []);

  // ✅ Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    if (charIndex < currentPhrase.length) {
      const typingTimeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(typingTimeout);
    } else {
      const pauseTimeout = setTimeout(() => {
        setCharIndex(0);
        setTypedText('');
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, currentPhraseIndex]);

  // ✅ Local keyword-based suggestion
  const handleSuggest = () => {
    const lowerInput = input.toLowerCase();
    const matches = components.filter((component) =>
      component.keywords.some((keyword) => lowerInput.includes(keyword))
    );
    setSuggestedComponents(matches);
  };

  // ✅ OpenAI API call
  const fetchAISuggestion = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/suggest', { input });
      setAiSuggestion(res.data.suggestion);
    } catch (err) {
      console.error('Failed to fetch AI suggestion:', err);
    }
  };

  // ✅ Copy code snippet
  const handleCopy = async (snippet: string, name: string) => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          width: '600px',
          minHeight: '120px',
          padding: '1.5rem',
          fontSize: '1.1rem',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          outline: 'none',
          resize: 'vertical',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      />
      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{input.length}/500</div>

      <Button
        onClick={handleSuggest}
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        ✨ Suggest Components
      </Button>

      <Button
        onClick={fetchAISuggestion}
        style={{
          backgroundColor: '#10B981',
          color: 'white',
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        💡 Suggest with AI
      </Button>

      {aiSuggestion && (
        <div
          style={{
            marginTop: '1rem',
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '700px',
          }}
        >
          <h3>AI Suggestion:</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}

      {suggestedComponents.length > 0 && (
        <div
          style={{
            marginTop: '2rem',
            maxWidth: '700px',
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
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ fontWeight: 'bold' }}>{component.name}</h4>
              <p>{component.description}</p>
              <pre
                style={{
                  backgroundColor: '#f7f7f7',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  overflowX: 'auto',
                  marginTop: '0.5rem',
                }}
              >
                <code>{component.codeSnippet}</code>
                <VisaCopyLow
                  aria-label='Copy to clipboard'
                  style={{
                    marginLeft: '8px',
                    cursor: 'pointer',
                    width: '24px',
                    height: '24px',
                  }}
                  onClick={() => handleCopy(component.codeSnippet, component.name)}
                />
              </pre>
              {copied === component.name && (
                <span style={{ fontSize: '0.8rem', color: 'green' }}>Copied!</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentSuggester;

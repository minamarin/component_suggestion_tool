import { useState, useEffect } from 'react';
import { Button } from '@visa/nova-react';
import { VisaCopyLow } from '@visa/nova-icons-react';
import axios from 'axios';
import ComponentPreview from './ComponentPreview';
import ClickableMessageCard from './MessageComponent';

type ComponentType = {
  name: string;
  description: string;
  keywords: string[];
  codeSnippet: string;
};

// 🟡 Extract JSX code from OpenAI response
const extractJSX = (aiText: string): string => {
  const match = aiText.match(/```(?:jsx)?([\s\S]*?)```/);
  return match ? match[1].trim() : '';
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
  const [suggestedComponents, setSuggestedComponents] = useState<
    ComponentType[]
  >([]);
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  // const [aiSuggestion, setAiSuggestion] = useState<string>('');

  // ✅ Typewriter states
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const [aiComponentName, setAiComponentName] = useState('');
  const [aiComponentCode, setAiComponentCode] = useState('');
  const [previewCode, setPreviewCode] = useState('');

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
    if (input.length > 500) {
      alert('word count exceeded');
      return;
    }
    const lowerInput = input.toLowerCase();
    const matches = components.filter((component) =>
      component.keywords.some((keyword) => lowerInput.includes(keyword))
    );
    setSuggestedComponents(matches);
  };

  // const fetchAISuggestion = async () => {
  //   try {
  //     const res = await axios.post('http://localhost:4000/api/suggest', { input });
  //     const suggestion = res.data.suggestion;
  //     setAiSuggestion(suggestion);

  //     // Extract JSX for live preview
  //     const jsxOnly = extractJSX(suggestion);
  //     setPreviewCode(jsxOnly);

  //   } catch (err) {
  //     console.error('Failed to fetch AI suggestion:', err);
  //   }
  // };

  const fetchAISuggestion = async () => {
    if (input.length > 500) {
      alert('word count exceeded');
      return;
    }
    try {
      const res = await axios.post('http://localhost:4000/api/suggest', {
        input,
      });
      const { componentName, componentCode } = res.data;
      setAiComponentName(componentName);
      setAiComponentCode(componentCode);
      setPreviewCode(componentCode);
    } catch (err) {
      console.error('AI Suggestion error:', err);
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {/* <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          {input.length}/500
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Button onClick={handleSuggest}>✨ Suggest Components</Button>
          <Button alternate onClick={fetchAISuggestion}>
            💡 Suggest with AI
          </Button>
        </div> */}
      </div>

      {aiComponentName && aiComponentCode && (
        <>
          <h2
            style={{ marginTop: '1rem', maxWidth: '700px', textAlign: 'left' }}
          >
            AI Suggested Components:
          </h2>
          <div
            style={{
              // marginTop: '1rem',
              backgroundColor: '#ffef99',
              padding: '1.5rem',
              borderRadius: '12px',
              maxWidth: '700px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'left',
            }}
          >
            <h4 style={{ fontWeight: 'bold' }}>Component Name:</h4>
            <p>{aiComponentName}</p>

            <h4 style={{ fontWeight: 'bold' }}>Code Snippet:</h4>
            <pre
              style={{
                backgroundColor: '#e5e7eb',
                padding: '1rem',
                borderRadius: '8px',
                overflowX: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <code style={{ flex: 1 }}>{aiComponentCode}</code>
              <VisaCopyLow
                aria-label='Copy to clipboard'
                style={{
                  cursor: 'pointer',
                  width: '24px',
                  height: '24px',
                  flexShrink: 0,
                }}
                onClick={() => handleCopy(aiComponentCode, aiComponentName)}
              />
            </pre>
            {copied === aiComponentName && (
              <span style={{ fontSize: '0.8rem', color: 'green' }}>
                Copied!
              </span>
            )}
            <h4 style={{ fontWeight: 'bold' }}>Live Preview:</h4>
            <ComponentPreview code={previewCode} />
          </div>
        </>
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
              className='var(--palette-default-surface-highlight)'
              style={{
                marginBottom: '1.5rem',
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                // backgroundColor: '#9ba6eeff',
                backgroundColor: 'rgba(179, 215, 255, 0.35)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ fontWeight: 'bold' }}>{component.name}</h4>
              <p>{component.description}</p>
              <pre
                style={{
                  backgroundColor: '#f7f7f7ff',
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
                  onClick={() =>
                    handleCopy(component.codeSnippet, component.name)
                  }
                />
              </pre>
              {copied === component.name && (
                <span style={{ fontSize: '0.8rem', color: 'green' }}>
                  Copied!
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {/* TEXT INPUT AND BUTTONS*/}
      <div
        style={{
          position: 'relative',
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
        {/* Buttons */}

        <div
          style={{
            // position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-end'

          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            {input.length}/500
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Button onClick={handleSuggest}>✨ Suggest Components</Button>
            <Button alternate onClick={fetchAISuggestion}>
              💡 Suggest with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSuggester;

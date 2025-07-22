import { useState, useEffect } from 'react';
import { Button } from '@visa/nova-react';
import { VisaCopyLow } from '@visa/nova-icons-react';
import axios from 'axios';
import ComponentPreview from './ComponentPreview';
import { ClickableMessageCard } from './MessageComponent';

type ComponentType = {
  name: string;
  description: string;
  keywords: string[];
  codeSnippet: string;
};

// 🟡 Extract JSX code from OpenAI response
// const extractJSX = (aiText: string): string => {
//   const match = aiText.match(/```(?:jsx)?([\s\S]*?)```/);
//   return match ? match[1].trim() : '';
// };

// ✅ Typewriter placeholder phrases
const phrases = [
  'Type here for VISA components suggestion…',
  'Describe the UI you’d like to build…',
  'What would you like to create today?',
  'Start typing to discover relevant Visa components…',
];

const ComponentSuggester = () => {
  const [input, setInput] = useState('');
  // Chronological chat history: each entry is { type: 'ai' | 'local', ...props }
  const [chatHistory, setChatHistory] = useState<any[]>([]);
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
    axios;
    // .get('http://localhost:4000/api/components')
    axios
      .get('https://visa-component-backend-1.onrender.com/api/components')
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
    if (matches.length === 0) {
      alert('no components found');
      return;
    }
    // Add each local suggestion to chat history
    setChatHistory((prev) => [
      ...prev,
      ...matches.map((component) => ({
        type: 'local',
        name: component.name,
        description: component.description,
        codeSnippet: component.codeSnippet,
      })),
    ]);
  };

  const fetchAISuggestion = async () => {
    if (input.length > 500) {
      alert('word count exceeded');
      return;
    }
    try {
      const res = await axios.post(
        'https://visa-component-backend-1.onrender.com/api/suggest',
        { input }
      );
      const { componentName, componentCode } = res.data;
      setAiComponentName(componentName);
      setAiComponentCode(componentCode);
      setPreviewCode(componentCode);
      // Add AI suggestion to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          type: 'ai',
          name: componentName,
          codeSnippet: componentCode,
        },
      ]);
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

      {/* Chat box: suggestion cards above, textarea and buttons at the bottom */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '600px',
          minHeight: '200px',
          maxHeight: '600px',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          padding: '2rem 1rem',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        {/* Suggestion cards scrollable area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '1rem',
            maxHeight: '350px',
          }}
        >
          {/* Render chatHistory in order: oldest at top, newest at bottom */}
          {chatHistory.map((entry, idx) => {
            if (entry.type === 'ai') {
              // Only show live preview for the most recent AI suggestion
              const isLatestAI =
                chatHistory.filter((e) => e.type === 'ai').slice(-1)[0] ===
                entry;
              return (
                <ClickableMessageCard
                  key={`ai-${idx}-${entry.name}`}
                  headline={entry.name}
                  subtitle={'AI Suggested Component'}
                  description={
                    <>
                      <div>
                        <strong>Code Snippet:</strong>
                      </div>
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
                        <code style={{ flex: 1 }}>{entry.codeSnippet}</code>
                        <VisaCopyLow
                          aria-label='Copy to clipboard'
                          style={{
                            cursor: 'pointer',
                            width: '24px',
                            height: '24px',
                            flexShrink: 0,
                          }}
                          onClick={() =>
                            handleCopy(entry.codeSnippet, entry.name)
                          }
                        />
                      </pre>
                      {copied === entry.name && (
                        <span style={{ fontSize: '0.8rem', color: 'green' }}>
                          Copied!
                        </span>
                      )}
                      {isLatestAI && (
                        <div style={{ marginTop: '1rem' }}>
                          <strong>Live Preview:</strong>
                          <ComponentPreview code={entry.codeSnippet} />
                        </div>
                      )}
                    </>
                  }
                />
              );
            } else {
              return (
                <ClickableMessageCard
                  key={`local-${idx}-${entry.name}`}
                  headline={entry.name}
                  subtitle={'Suggested Component'}
                  description={
                    <>
                      <div>{entry.description}</div>
                      <pre
                        style={{
                          backgroundColor: '#f7f7f7ff',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          overflowX: 'auto',
                          marginTop: '0.5rem',
                        }}
                      >
                        <code>{entry.codeSnippet}</code>
                        <VisaCopyLow
                          aria-label='Copy to clipboard'
                          style={{
                            marginLeft: '8px',
                            cursor: 'pointer',
                            width: '24px',
                            height: '24px',
                          }}
                          onClick={() =>
                            handleCopy(entry.codeSnippet, entry.name)
                          }
                        />
                      </pre>
                      {copied === entry.name && (
                        <span style={{ fontSize: '0.8rem', color: 'green' }}>
                          Copied!
                        </span>
                      )}
                    </>
                  }
                />
              );
            }
          })}
        </div>
        {/* Textarea and buttons at the bottom */}
        <div style={{ width: '100%' }}>
          <textarea
            placeholder={typedText}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='responsive-textarea'
            style={{
              width: '100%',
              maxWidth: '900px',
              minHeight: '100px',
              padding: '1.5rem',
              fontSize: '1.1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              resize: 'vertical',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.07)',
              marginBottom: '0.5rem',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{ fontSize: '0.8rem', color: '#9ca3af', margin: '0.5rem 0' }}
          >
            {input.length}/500
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '0.5rem',
            }}
          >
            <Button onClick={handleSuggest}> Suggest Components</Button>
            <Button alternate onClick={fetchAISuggestion}>
              Suggest with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSuggester;

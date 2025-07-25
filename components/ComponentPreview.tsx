import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as VisaComponents from '@visa/nova-react';

// Utility: extract all JSX tag names from code string
function extractComponentNames(code: string): string[] {
  // Match <ComponentName ... or </ComponentName>
  const regex = /<\s*([A-Z][A-Za-z0-9_]*)\b/g;
  const names = new Set<string>();
  let match;
  while ((match = regex.exec(code))) {
    names.add(match[1]);
  }
  return Array.from(names);
}

// Utility: extract all handler names like onClick={handleAddToCart}
function extractHandlerNames(code: string): string[] {
  const regex = /on\w+\s*=\s*{\s*([a-zA-Z0-9_]+)\s*}/g;
  const names = new Set<string>();
  let match;
  while ((match = regex.exec(code))) {
    names.add(match[1]);
  }
  return Array.from(names);
}

const ComponentPreview = ({ code }: { code: string }) => {
  const wrappedCode = `<><div style={{margin:'1rem', padding:'1rem'}}>${code}</div></>`;
  const usedComponents = extractComponentNames(code);
  const available = Object.keys(VisaComponents);
  const missing = usedComponents.filter((name) => !available.includes(name));

  if (missing.length > 0) {
    return (
      <div
        style={{
          color: 'red',
          padding: '1rem',
          background: '#fff0f0',
          borderRadius: '8px',
        }}
      >
        <b>Preview Error:</b> The following components are not available in
        @visa/nova-react:
        <br />
        <code>{missing.join(', ')}</code>
      </div>
    );
  }

  // Inject dummy handler functions for any referenced handler
  const handlerNames = extractHandlerNames(code);
  const handlerScope: Record<string, any> = {};
  handlerNames.forEach((name) => {
    handlerScope[name] = () => {};
  });

  const previewScope = { React, ...VisaComponents, ...handlerScope };

  return (
    <LiveProvider code={wrappedCode} scope={previewScope} noInline={false}>
      <LivePreview />
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  );
};

export default ComponentPreview;

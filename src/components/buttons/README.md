# Buttons Folder

This folder contains all button component variants.

## How to Add a New Button

1. Create a new file: `your-button-name.tsx`
2. Export a Component object with the name `yourButtonName` (camelCase)
3. Import and add it to `src/components/index.ts`

### Example Structure

```typescript
import React from 'react';
import { Component } from '../../types/component';

const Preview = () => (
  <button>Your button JSX here</button>
);

const ReactCode = `// Your React code`;

const VueCode = `// Your Vue code`;

const HtmlCode = `// Your HTML/CSS code`;

export const yourButtonName: Component = {
  id: 'button-your-name',
  title: 'Your Button Name',
  description: 'Description of your button',
  category: 'Button',
  tags: ['button', 'your-tag'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
};
```

Then in `src/components/index.ts`, add:
```typescript
import { yourButtonName } from './buttons/your-button-name';

export const components = [
  // ... existing components
  yourButtonName,
];
```




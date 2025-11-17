# Quick Start Guide

## How the Structure Works

The project is organized by component type. Each component type (buttons, cards, menus, etc.) has its own folder, and each individual component is in its own file.

```
src/components/
├── buttons/          ← All button variants go here
│   ├── primary-button.tsx
│   └── secondary-button.tsx
├── cards/            ← All card variants go here
├── menus/            ← All menu variants go here
└── sliders/          ← All slider variants go here
```

## Adding a New Button (Example)

### 1. Create the file: `src/components/buttons/outline-button.tsx`

```typescript
import React from 'react';
import { Component } from '../../types/component';

const Preview = () => (
  <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg">
    Outline
  </button>
);

const ReactCode = `// Your React code`;
const VueCode = `// Your Vue code`;
const HtmlCode = `// Your HTML code`;

export const outlineButton: Component = {
  id: 'button-outline',
  title: 'Outline Button',
  description: 'An outlined button style',
  category: 'Button',
  tags: ['button', 'outline'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
};
```

### 2. Add to `src/components/index.ts`

```typescript
import { outlineButton } from './buttons/outline-button';

export const components = [
  // ... existing
  outlineButton,  // Add this line
];
```

**Done!** The new button will automatically appear in the gallery.

## Adding Other Component Types

- **Cards**: Create files in `src/components/cards/`
- **Menus**: Create files in `src/components/menus/`
- **Sliders**: Create files in `src/components/sliders/`
- **New Type**: Create a new folder (e.g., `src/components/modals/`) and follow the same pattern

## Key Points

✅ Each component is self-contained in its own file  
✅ Components are organized by type in folders  
✅ Just import and add to `index.ts` to register  
✅ No database needed - everything is in code  
✅ Gallery automatically discovers new components  




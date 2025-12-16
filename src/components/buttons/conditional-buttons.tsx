import { useCallback, useMemo, useState } from "react";
import { Component } from "../../types/component";

const checkRequirement = (value: number): boolean => {
  //Example requirement: value must be >= 5
  return value >= 5;
};

const Preview = () => {
  const [value, setValue] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Check if requirement is met (similar to hasViewAvailability in Filter.tsx)
  const meetsRequirement = useMemo(() => {
    return checkRequirement(value);
  }, [value]);

  // Handle button click (similar to handleViewTypeChange in Filter.tsx)
  const handleButtonClick = useCallback(
    (buttonId: string) => {
      if (buttonId === "button1" && !meetsRequirement) {
        // Don't allow click if requirement not met
        return;
      }
      setActiveButton((prev) => (prev === buttonId ? null : buttonId));
    },
    [meetsRequirement]
  );

  return (
    <div className="p-6 space-y-4">
      {/* {Example requirement controls} */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Value (must be ≥ 5 to enable Button 2): {value}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* {Buttons} */}
      <div className="flex gap-3">
        {/* Button 1 */}
        <button
          type="button"
          onClick={() => handleButtonClick("button1")}
          className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  activeButton === "button1"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
        >
          Button 1
        </button>

        {/* Button 2 */}
        <button
          type="button"
          onClick={() => handleButtonClick("button2")}
          disabled={!meetsRequirement}
          className={`
                    px-6 py-3 rounded-lg font-medium transition-all duration delay-200
                    ${
                      !meetsRequirement
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
                        : activeButton === "button2"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }
                `}
        >
          Button 2
        </button>
      </div>

      {/* Status indicator */}
      <p className="text-sm text-gray-400">
        Requirement met: {meetsRequirement ? "✅ Yes" : "❌ No"}
      </p>
    </div>
  );
};

const ReactCode = `import React, { useState, useMemo, useCallback } from 'react';

// Example requirement checker
const checkRequirement = (value: number): boolean => {
  return value >= 5;
};

export default function ConditionalButtons() {
  const [value, setValue] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Check if requirement is met
  const meetsRequirement = useMemo(() => {
    return checkRequirement(value);
  }, [value]);

  // Handle button click
  const handleButtonClick = useCallback((buttonId: string) => {
    if (buttonId === 'button2' && !meetsRequirement) {
      return; // Don't allow click if requirement not met
    }
    setActiveButton(prev => prev === buttonId ? null : buttonId);
  }, [meetsRequirement]);

  return (
    <div className="p-6 space-y-4">
      {/* Requirement control */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Value (must be ≥ 5): {value}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Two Buttons */}
      <div className="flex gap-4">
        {/* Button 1 - Always enabled */}
        <button
          type="button"
          onClick={() => handleButtonClick('button1')}
          className={\`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            \${
              activeButton === 'button1'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          \`}
        >
          Button 1
        </button>

        {/* Button 2 - Disabled when requirement not met */}
        <button
          type="button"
          onClick={() => handleButtonClick('button2')}
          disabled={!meetsRequirement}
          className={\`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            \${
              !meetsRequirement
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                : activeButton === 'button2'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          \`}
        >
          Button 2
        </button>
      </div>
    </div>
  );
}`;

const VueCode = `<template>
  <div class="p-6 space-y-4">
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">
        Value (must be ≥ 5): {{ value }}
      </label>
      <input
        type="range"
        min="0"
        max="10"
        :value="value"
        @input="value = Number($event.target.value)"
        class="w-full"
      />
    </div>

    <div class="flex gap-4">
      <button
        type="button"
        @click="handleButtonClick('button1')"
        :class="[
          'px-6 py-3 rounded-lg font-medium transition-all duration-200',
          activeButton === 'button1'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        ]"
      >
        Button 1
      </button>

      <button
        type="button"
        @click="handleButtonClick('button2')"
        :disabled="!meetsRequirement"
        :class="[
          'px-6 py-3 rounded-lg font-medium transition-all duration-200',
          !meetsRequirement
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
            : activeButton === 'button2'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        ]"
      >
        Button 2
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const value = ref(0);
const activeButton = ref(null);

const checkRequirement = (val) => val >= 5;

const meetsRequirement = computed(() => checkRequirement(value.value));

const handleButtonClick = (buttonId) => {
  if (buttonId === 'button2' && !meetsRequirement.value) {
    return;
  }
  activeButton.value = activeButton.value === buttonId ? null : buttonId;
};
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .button-container {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-active {
      background-color: #2563eb;
      color: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .btn-inactive {
      background-color: #374151;
      color: #d1d5db;
    }
    
    .btn-inactive:hover {
      background-color: #4b5563;
    }
    
    .btn-disabled {
      background-color: #1f2937;
      color: #6b7280;
      cursor: not-allowed;
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <div class="button-container">
    <button class="btn btn-inactive" onclick="toggleButton('button1')">
      Button 1
    </button>
    <button 
      class="btn btn-disabled" 
      id="button2"
      disabled
      onclick="toggleButton('button2')"
    >
      Button 2
    </button>
  </div>
  
  <script>
    let activeButton = null;
    let meetsRequirement = false; // Set based on your requirement
    
    function toggleButton(buttonId) {
      if (buttonId === 'button2' && !meetsRequirement) {
        return;
      }
      
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
        btn.classList.remove('btn-active');
        btn.classList.add('btn-inactive');
      });
      
      if (activeButton === buttonId) {
        activeButton = null;
      } else {
        activeButton = buttonId;
        event.target.classList.add('btn-active');
        event.target.classList.remove('btn-inactive');
      }
    }
  </script>
</body>
</html>`;

export const conditionalButtons: Component = {
  id: "conditional-buttons",
  title: "Conditional Buttons with Disabled State",
  description:
    "Two buttons where one can be disabled based on requirements, similar to Filter.tsx pattern.",
  category: "Button",
  tags: ["button", "disabled", "conditional", "state"],
  preview: Preview,
  codes: [
    { language: "react", code: ReactCode, label: "React" },
    { language: "vue", code: VueCode, label: "Vue" },
    { language: "html", code: HtmlCode, label: "HTML/CSS" },
  ],
  explanation: `<strong>Key Concepts (Following Filter.tsx Pattern):</strong>

1. <strong>Requirement Check:</strong>
   - Use \`useMemo\` to compute if requirements are met (like \`hasViewAvailability\` in Filter.tsx)
   - This prevents unnecessary recalculations

2. <strong>Disabled State:</strong>
   - Use the \`disabled\` attribute on the button
   - Apply disabled styling: \`opacity-50\`, \`cursor-not-allowed\`, muted colors

3. <strong>Click Handler:</strong>
   - Use \`useCallback\` to memoize the handler (like \`handleViewTypeChange\` in Filter.tsx)
   - Early return if button is disabled and clicked

4. <strong>Active State:</strong>
   - Track which button is active (similar to \`activeFilter\` in Filter.tsx)
   - Toggle active state on click

<strong>Real-World Examples:</strong>

- <strong>Level Filter:</strong> Disable view buttons when no units exist on selected level
- <strong>Form Validation:</strong> Disable submit button until form is valid
- <strong>API Data:</strong> Disable buttons until data is loaded
- <strong>Permissions:</strong> Disable buttons based on user role

<strong>Pattern from Filter.tsx:</strong>
\`\`\`
const isDisabled = isLevelFilterActive && !hasViewAvailability(category.id);
\`\`\`
This checks both a condition (level filter active) AND availability.`,
  author: "UI Library",
  createdAt: "2024-01-01",
};

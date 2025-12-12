# Unreal Engine Tutorial Images

This folder is for storing images used in the Unreal Engine documentation tutorials.

## Where to Put Images

Place all tutorial images in this folder:
```
public/assets/unreal-engine/
```

## How to Use Images in Markdown

### Block-Level Images (Recommended for Screenshots)

Use this format for standalone images (like screenshots):

```markdown
![Description of the image](/assets/unreal-engine/image-name.png)
```

**Example:**
```markdown
![Unreal Editor Content Browser showing folder structure](/assets/unreal-engine/content-browser-folders.png)
```

### Inline Images

Images can also be used inline within paragraphs:

```markdown
This is a paragraph with an inline image ![icon](/assets/unreal-engine/icon.png) in the middle.
```

## Image Naming Suggestions

- Use descriptive names: `orbit-camera-setup-step1.png`
- Use lowercase and hyphens: `project-organization-folders.png`
- Include step numbers if applicable: `step-2-content-browser.png`
- Be specific: `blueprint-editor-input-action.png`

## Supported Image Formats

- PNG (recommended for screenshots)
- JPG/JPEG
- WebP
- GIF

## Example Structure

```
public/assets/unreal-engine/
├── README.md (this file)
├── project-organization/
│   ├── content-browser-folders.png
│   └── project-structure.png
├── orbit-camera-setup/
│   ├── step-1-cpp-class.png
│   ├── step-2-folders.png
│   └── blueprint-setup.png
├── ui-hud-guide/
│   └── widget-editor.png
└── materials-lighting/
    └── material-editor.png
```

## Tips

1. **Optimize images**: Compress PNG files to reduce file size
2. **Use descriptive alt text**: Helps with accessibility and SEO
3. **Keep images organized**: Consider subfolders for different tutorials
4. **Consistent sizing**: Try to keep tutorial screenshots at similar sizes for better UX


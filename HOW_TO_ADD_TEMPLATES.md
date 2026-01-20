# How to Add New Resume Templates

This guide explains how to manually add new resume templates to your resume builder application.

## Quick Overview

Adding a new template requires 2 simple steps:
1. Add template metadata to the templates list
2. Define the visual styling for the template

---

## Step 1: Add Template to List

**File:** `/app/frontend/src/mock.js`

Find the `mockTemplates` array (around line 75) and add your new template:

```javascript
export const mockTemplates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'creative', name: 'Creative', description: 'Stand out with bold design' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  { id: 'professional', name: 'Professional', description: 'Corporate-friendly format' },
  { id: 'bold', name: 'Bold', description: 'Make a strong impression' },
  
  // ADD YOUR NEW TEMPLATE HERE:
  { id: 'executive', name: 'Executive', description: 'Premium design for senior roles' },
  { id: 'tech', name: 'Tech', description: 'Developer-focused with code styling' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated serif design' }
];
```

**Template Object Properties:**
- `id` (required): Unique identifier (lowercase, no spaces)
- `name` (required): Display name shown to users
- `description` (required): Brief description of the template

---

## Step 2: Define Template Styling

**File:** `/app/frontend/src/components/PreviewPanel.jsx`

Find the `templateStyles` object (around line 7) and add styling for your new template:

```javascript
const templateStyles = {
  modern: {
    container: 'bg-white',
    header: 'bg-blue-600 text-white p-8',
    section: 'mb-6',
    sectionTitle: 'text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-3',
    text: 'text-gray-700'
  },
  
  // ... other templates ...
  
  // ADD YOUR NEW TEMPLATE STYLING HERE:
  executive: {
    container: 'bg-gray-50',
    header: 'bg-gradient-to-r from-slate-800 to-slate-900 text-white p-10',
    section: 'mb-8',
    sectionTitle: 'text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-300',
    text: 'text-gray-800'
  },
  
  tech: {
    container: 'bg-slate-900 text-gray-100',
    header: 'bg-gradient-to-r from-green-400 to-blue-500 text-black p-8 font-mono',
    section: 'mb-6 border-l-4 border-green-400 pl-4',
    sectionTitle: 'text-xl font-bold text-green-400 mb-3 font-mono',
    text: 'text-gray-300 font-mono text-sm'
  },
  
  elegant: {
    container: 'bg-cream-50',
    header: 'border-b-4 border-amber-700 p-8',
    section: 'mb-8',
    sectionTitle: 'text-2xl font-serif text-amber-900 mb-4',
    text: 'text-gray-700 font-serif'
  }
};
```

### Style Properties Explained:

- **container**: Background and overall styling of the resume
- **header**: Styling for the personal info section at the top
- **section**: Spacing and layout for each section (Experience, Education, etc.)
- **sectionTitle**: Styling for section headings (Work Experience, Education, etc.)
- **text**: Default text styling for content

---

## Complete Example: Adding "Executive" Template

### 1. Add to mock.js:

```javascript
export const mockTemplates = [
  // ... existing templates ...
  { id: 'executive', name: 'Executive', description: 'Premium design for senior roles' }
];
```

### 2. Add styling to PreviewPanel.jsx:

```javascript
executive: {
  container: 'bg-gray-50',
  header: 'bg-gradient-to-r from-slate-800 to-slate-900 text-white p-10',
  section: 'mb-8',
  sectionTitle: 'text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-300',
  text: 'text-gray-800'
}
```

### 3. Save and refresh - Done! ✅

Your new template will automatically appear in the template selector.

---

## Tailwind CSS Classes You Can Use

### Colors:
- Text: `text-{color}-{shade}` (e.g., `text-blue-600`, `text-gray-900`)
- Background: `bg-{color}-{shade}` (e.g., `bg-blue-500`, `bg-white`)
- Gradients: `bg-gradient-to-r from-{color} to-{color}`

### Common Colors:
- `slate`, `gray`, `zinc`, `neutral`, `stone`
- `red`, `orange`, `amber`, `yellow`, `lime`, `green`
- `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`
- `violet`, `purple`, `fuchsia`, `pink`, `rose`

### Spacing:
- Padding: `p-{size}` (e.g., `p-4`, `p-8`, `p-10`)
- Margin: `m-{size}`, `mb-{size}` (margin-bottom), `mt-{size}` (margin-top)

### Typography:
- Size: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- Weight: `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- Font Family: `font-sans`, `font-serif`, `font-mono`

### Borders:
- Border: `border`, `border-{side}`, `border-{size}`
- Border Color: `border-{color}-{shade}`
- Rounded: `rounded`, `rounded-lg`, `rounded-full`

---

## Tips for Creating Great Templates

### 1. **Keep It Professional**
- Use readable fonts and colors
- Ensure good contrast between text and background
- Maintain consistent spacing

### 2. **Think About ATS**
- Avoid complex layouts that might confuse ATS systems
- Use standard section headings
- Keep formatting clean and simple

### 3. **Test Different Content**
- Test with short and long content
- Check how it looks with multiple experiences
- Verify all sections display correctly

### 4. **Color Schemes**
```javascript
// Conservative (Finance, Legal)
header: 'bg-gray-900 text-white'
sectionTitle: 'text-gray-900 border-b-2 border-gray-900'

// Creative (Design, Marketing)
header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
sectionTitle: 'text-purple-600'

// Tech (Engineering, IT)
header: 'bg-slate-800 text-green-400'
sectionTitle: 'text-green-500 font-mono'

// Corporate (Business, Consulting)
header: 'bg-blue-900 text-white'
sectionTitle: 'text-blue-800 border-l-4 border-blue-800 pl-3'
```

---

## Advanced: Adding Custom Fonts

If you want to use custom fonts:

1. Import font in `/app/frontend/src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
```

2. Configure in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    fontFamily: {
      'playfair': ['Playfair Display', 'serif'],
    }
  }
}
```

3. Use in template:
```javascript
header: 'font-playfair text-4xl'
```

---

## Troubleshooting

### Template Not Showing Up?
- Check that the `id` in mock.js matches the key in templateStyles
- Verify no syntax errors (missing commas, brackets)
- Refresh the browser after saving changes

### Styling Looks Wrong?
- Check Tailwind class names for typos
- Verify color shades are valid (50-900)
- Test in browser developer tools first

### Need Help?
- Check existing templates for reference
- Use browser inspect tool to test classes
- Refer to Tailwind CSS documentation: https://tailwindcss.com/docs

---

## Quick Reference Template Structure

```javascript
// In mock.js
{ 
  id: 'template-id',           // Unique ID (lowercase, no spaces)
  name: 'Template Name',        // Display name
  description: 'Description'    // Brief description
}

// In PreviewPanel.jsx
templateId: {
  container: 'bg-white',                    // Resume background
  header: 'bg-blue-600 text-white p-8',   // Personal info section
  section: 'mb-6',                         // Section spacing
  sectionTitle: 'text-xl font-bold',      // Section headings
  text: 'text-gray-700'                    // Body text
}
```

---

## Examples of Industry-Specific Templates

### Legal Template
```javascript
// In mock.js
{ id: 'legal', name: 'Legal', description: 'Conservative design for legal professionals' }

// In PreviewPanel.jsx
legal: {
  container: 'bg-white',
  header: 'border-b-4 border-gray-900 p-8',
  section: 'mb-8',
  sectionTitle: 'text-xl font-serif font-bold text-gray-900 uppercase tracking-wide mb-4',
  text: 'text-gray-800 font-serif'
}
```

### Creative Agency Template
```javascript
// In mock.js
{ id: 'agency', name: 'Agency', description: 'Bold design for creative professionals' }

// In PreviewPanel.jsx
agency: {
  container: 'bg-gradient-to-br from-orange-50 to-red-50',
  header: 'bg-black text-white p-10',
  section: 'mb-6',
  sectionTitle: 'text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-3',
  text: 'text-gray-900'
}
```

### Academic Template
```javascript
// In mock.js
{ id: 'academic', name: 'Academic', description: 'Traditional design for academia' }

// In PreviewPanel.jsx
academic: {
  container: 'bg-white',
  header: 'p-8 text-center border-b-2 border-gray-300',
  section: 'mb-8',
  sectionTitle: 'text-lg font-serif text-center text-gray-900 mb-4 uppercase',
  text: 'text-gray-700 font-serif leading-relaxed'
}
```

---

That's it! You can now create unlimited custom templates for your resume builder. Happy designing! 🎨

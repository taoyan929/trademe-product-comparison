# Trade Me UI Kit Reference

Quick reference for design system based on UX team specifications.

## Colors

### Primary Colors
```css
Primary Blue:   #007acd   /* Buttons, links, CTAs */
Heading Black:  #44413d   /* H1, H2, titles, navbar text */
Body Text:      #65605d   /* Paragraph text, descriptions */
```

### UI Colors
```css
Caption Grey:   #76716D   /* Small text, captions, footer */
Border Grey:    #D9D9D9   /* Borders, dividers, shadows */
Background:     #F5F5F5   /* Hover states, background areas */
```

### Status Colors
```css
Urgent Red:     #E34647   /* Errors, countdown timers, urgent notifications */
Urgent Red BG:  #E3464720 /* Background for urgent messages (20% opacity) */
Success Yellow: #F9AF2C   /* Success messages, watchlist icon */
Success BG:     #F9AF2C20 /* Background for success messages (20% opacity) */
```

## Typography

### Font Stack
```css
font-family: 'Story Sans', 'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes
```css
H1:      28px   /* Product titles on detail page */
H2:      20px   /* Section headers (e.g., "Make an offer") */
Body:    14px   /* Standard text */
Caption: 12px   /* Small text, metadata */
```

### Font Weights
```css
Normal:  400
Medium:  500
Bold:    700
```

## Spacing

```css
XS:   4px    /* Tight spacing */
SM:   8px    /* Small gaps */
MD:   16px   /* Standard spacing */
LG:   24px   /* Section spacing */
XL:   32px   /* Large spacing */
XXL:  48px   /* Page sections */
```

## Components

### Buttons

**Primary Button (Call to Action)**
```css
background-color: #007acd;
color: #ffffff;
padding: 10px 20px;
border-radius: 4px;
font-size: 14px;
font-weight: 600;
```

**Secondary Button**
```css
background-color: #F5F5F5;
color: #44413d;
border: 1px solid #D9D9D9;
padding: 10px 20px;
border-radius: 4px;
```

**Warning/Watchlist Button**
```css
background-color: #F9AF2C;
color: #44413d;
padding: 10px 20px;
border-radius: 4px;
```

### Cards

**Product Card**
```css
background: #ffffff;
border: 1px solid #D9D9D9;
border-radius: 8px;
padding: 16px;
```

**Hover State**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
```

### Input Fields

**Default Input**
```css
border: 1px solid #D9D9D9;
border-radius: 4px;
padding: 10px 12px;
font-size: 14px;
color: #44413d;
```

**Focus State**
```css
border-color: #007acd;
outline: 2px solid #007acd;
outline-offset: 2px;
```

## Icons

### Icon Color
```css
Default: #44413d  /* Heading black */
Active:  #007acd  /* Primary blue */
```

### Icon Sizes
```css
Small:   16px
Medium:  20px
Large:   24px
```

## Badges & Notifications

### Urgent Countdown
```css
background-color: #E3464720;  /* 20% opacity */
color: #E34647;
padding: 8px 12px;
border-radius: 4px;
font-size: 12px;
font-weight: 600;
```

### Success Message
```css
background-color: #F9AF2C20;  /* 20% opacity */
color: #44413d;
padding: 12px 16px;
border-left: 4px solid #F9AF2C;
```

## Layout

### Container
```css
max-width: 1440px;
margin: 0 auto;
padding: 0 16px;  /* Mobile */
padding: 0 24px;  /* Tablet */
padding: 0 32px;  /* Desktop */
```

### Grid (Product Cards)
```css
display: grid;
grid-template-columns: 1fr;              /* Mobile */
grid-template-columns: repeat(2, 1fr);   /* Tablet */
grid-template-columns: repeat(4, 1fr);   /* Desktop */
gap: 16px;
```

## Breakpoints

```css
Mobile:  max-width: 768px
Tablet:  min-width: 768px and max-width: 1024px
Desktop: min-width: 1024px
```

## Responsive Examples

### Mobile-First Approach

```css
/* Mobile styles (default) */
.component {
  font-size: 14px;
  padding: 12px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    font-size: 16px;
    padding: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    font-size: 18px;
    padding: 20px;
  }
}
```

## Common Patterns

### Product Card Pricing
```css
.price-label {
  color: #76716D;      /* Caption grey */
  font-size: 12px;
}

.price-amount {
  color: #44413d;      /* Heading black */
  font-size: 18px;
  font-weight: 700;
}
```

### Links
```css
a {
  color: #007acd;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### Section Headers
```css
h2 {
  color: #44413d;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}
```

## Do's and Don'ts

### ✅ Do
- Use UI Kit colors exactly as specified
- Follow mobile-first responsive design
- Use semantic HTML elements
- Add hover states to interactive elements
- Use consistent spacing (multiples of 4px)

### ❌ Don't
- Add random hex codes not in the UI Kit
- Use inline styles
- Forget mobile responsiveness
- Use fixed widths (use responsive units)
- Ignore accessibility (add aria-labels, alt text)

## Quick Copy-Paste

### Primary Button
```css
.btn-primary {
  background-color: #007acd;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #0066ad;
}
```

### Product Card
```css
.product-card {
  background: #ffffff;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Input Field
```css
.input-field {
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px;
  color: #44413d;
  width: 100%;
}

.input-field:focus {
  border-color: #007acd;
  outline: 2px solid #007acd;
  outline-offset: 2px;
}
```

## Resources

- UX Design Files: `/UX` folder in Phase 1 repo
- Theme File: `src/styles/theme.js`
- Global Styles: `src/styles/global.css`

## Questions?

Post in Teams chat: **"Group 2.0 Mission 5"**

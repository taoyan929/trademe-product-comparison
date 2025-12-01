# Component Library

Shared components for Trade Me Marketplace frontend.

**Important:** Do NOT modify shared components without discussing in Teams chat first.

## Shared Components

Located in `src/components/shared/`

### ProductCard

Reusable product card for displaying auction items. Used across Home, Watchlist, and Comparison pages.

**Import:**
```javascript
import ProductCard from '../components/shared/ProductCard';
```

**Props:**
- `product` (object, required) - Auction product object
- `showBookmark` (boolean, optional) - Show bookmark icon (default: false)
- `onBookmarkClick` (function, optional) - Callback when bookmark is clicked

**Product Object Structure:**
```javascript
{
  _id: string,
  title: string,
  description: string,
  category: string,
  location: string,
  colour: string,
  start_price: number,
  reserve_price: number
}
```

**Example Usage:**
```javascript
function HomePage() {
  const [products, setProducts] = useState([]);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          showBookmark={true}
          onBookmarkClick={(id) => console.log('Bookmarked:', id)}
        />
      ))}
    </div>
  );
}
```

### Navbar

Main navigation header component.

**Import:**
```javascript
import Navbar from '../components/shared/Navbar';
```

**Props:**
None

**Example Usage:**
```javascript
function App() {
  return (
    <div>
      <Navbar />
      {/* Page content */}
    </div>
  );
}
```

### Button

Reusable button component following Trade Me UI Kit.

**Import:**
```javascript
import Button from '../components/shared/Button';
```

**Props:**
- `children` (node, required) - Button content
- `variant` (string, optional) - Button style: 'primary' | 'secondary' | 'warning' | 'danger' (default: 'primary')
- `size` (string, optional) - Button size: 'small' | 'medium' | 'large' (default: 'medium')
- `fullWidth` (boolean, optional) - Full width button (default: false)
- `disabled` (boolean, optional) - Disabled state (default: false)
- `onClick` (function, optional) - Click handler
- `type` (string, optional) - Button type: 'button' | 'submit' | 'reset' (default: 'button')

**Example Usage:**
```javascript
import Button from '../components/shared/Button';

function BiddingPanel() {
  const handleBid = () => {
    console.log('Place bid');
  };

  return (
    <div>
      <Button variant="primary" size="large" onClick={handleBid}>
        Place Bid
      </Button>

      <Button variant="secondary" size="medium">
        Cancel
      </Button>

      <Button variant="warning" fullWidth>
        Add to Watchlist
      </Button>

      <Button variant="danger" size="small" disabled>
        Delete
      </Button>
    </div>
  );
}
```

## Theme and Styling

### Using Theme Colors

Import the theme in your component:

```javascript
import theme from '../styles/theme';

// Use colors
const styles = {
  color: theme.colors.primaryBlue,
  backgroundColor: theme.colors.backgroundGrey
};
```

### Available Theme Values

**Colors:**
- `primaryBlue` - #007acd (buttons, links)
- `headingBlack` - #44413d (headings, titles)
- `bodyText` - #65605d (body text)
- `captionGrey` - #76716D (captions)
- `borderGrey` - #D9D9D9 (borders)
- `backgroundGrey` - #F5F5F5 (backgrounds)
- `urgentRed` - #E34647 (errors, urgent)
- `successYellow` - #F9AF2C (success)

**Typography:**
- `fontFamily` - Story Sans, Helvetica Neue, Arial
- `h1` - 28px
- `h2` - 20px
- `body` - 14px

**Spacing:**
- `xs` - 4px
- `sm` - 8px
- `md` - 16px
- `lg` - 24px
- `xl` - 32px

### CSS Variables

Alternatively, use CSS directly following the UI Kit:

```css
.my-component {
  color: #44413d; /* headingBlack */
  background-color: #F5F5F5; /* backgroundGrey */
  border: 1px solid #D9D9D9; /* borderGrey */
}

.my-button {
  background-color: #007acd; /* primaryBlue */
  color: #ffffff;
}

.my-button:hover {
  background-color: #0066ad; /* darker blue */
}
```

## Layout Components

### Container

Use the `.container` class for consistent page width and padding:

```javascript
function HomePage() {
  return (
    <div className="container">
      {/* Your content */}
    </div>
  );
}
```

The container is defined in `src/styles/global.css`:
- Max-width: 1440px
- Responsive padding (16px mobile, 24px tablet, 32px desktop)

## Creating New Components

### Component Structure

```
src/components/
├── shared/               # Shared components (require team discussion)
├── home/                 # Dev 1 components
├── product/              # Dev 2 components
└── comparison/           # Dev 3 components
```

### Component Template

```javascript
/**
 * ComponentName
 *
 * Description of what this component does.
 */

import './ComponentName.css';

export default function ComponentName({ prop1, prop2 }) {
  return (
    <div className="component-name">
      {/* Component content */}
    </div>
  );
}
```

### CSS File Template

```css
/**
 * ComponentName Styles
 * Based on Trade Me UI Kit
 */

.component-name {
  /* Styles here */
}

/* Responsive */
@media (max-width: 768px) {
  .component-name {
    /* Mobile styles */
  }
}
```

## Best Practices

1. **Use Shared Components** - Don't recreate ProductCard, Button, etc.
2. **Follow UI Kit** - Use theme colors, don't add random hex codes
3. **Mobile-First** - Write CSS for mobile, then add media queries for larger screens
4. **Semantic HTML** - Use proper HTML elements (button, nav, section, etc.)
5. **Accessibility** - Add aria-labels, alt text, keyboard navigation
6. **Keep Components Small** - Each component should have one responsibility
7. **Document Props** - Add comments explaining what props do

## Questions?

Post in Teams chat: **"Group 2.0 Mission 5"**

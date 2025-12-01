/**
 * Trade Me UI Kit Theme
 *
 * Design system colors and typography from UX team specifications.
 * DO NOT modify these values without discussing in Teams chat first.
 */

export const colors = {
  // Primary Colors
  primaryBlue: '#007acd',      // Call to Action Blue - Use for buttons, links
  headingBlack: '#44413d',     // Heading Black - H1, H2, H3, H4, descriptions, usernames
  bodyText: '#65605d',         // Body Text - Use for body text

  // UI Colors
  captionGrey: '#76716D',      // Caption messages, list items in footer
  borderGrey: '#D9D9D9',       // Borders, shadows
  backgroundGrey: '#F5F5F5',   // Hover color, background area

  // Status Colors
  urgentRed: '#E34647',        // Urgent Red - Errors, notifications, expiring auction time
  urgentRedBg: '#E3464720',    // Background for urgent messages (20% opacity)
  successYellow: '#F9AF2C',    // Success messages, comparison filter results
  successYellowBg: '#F9AF2C20' // Background for success messages (20% opacity)
};

export const typography = {
  // Font Stack
  fontFamily: `'Story Sans', 'Helvetica Neue', Arial, sans-serif`,

  // Font Sizes
  h1: '28px',
  h2: '20px',
  body: '14px',
  caption: '12px',

  // Font Weights
  normal: 400,
  medium: 500,
  bold: 700
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
};

export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px'
};

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1440px'
};

// Export default theme object
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  breakpoints
};

/**
 * Design System — single source of truth for spacing, typography, layout, and components.
 * Use these constants in sx props and theme overrides for consistent visual rhythm.
 */

// Base unit: 8px. All spacing is a multiple of this.
export const SPACING = {
  unit: 8,
  /** Section vertical padding: 40px mobile, 60px tablet, 80px desktop */
  sectionY: { xs: 5, sm: 7.5, md: 10 },
  /** Section horizontal padding: 16px mobile, 24px desktop */
  sectionX: { xs: 2, md: 3 },
  /** Tighter section (e.g. between hero and content) */
  sectionYCompact: { xs: 4, md: 6 },
  /** Content gap inside sections */
  contentGap: 4,
  /** Grid gap between cards/items */
  gridGap: 4,
  /** Form: vertical gap between fields (24px) */
  formFieldGap: 3,
  /** Form: gap between logical sections (e.g. guest info vs room details) */
  formSectionGap: 4,
  /** Card padding: 24px (consistent across breakpoints) */
  cardPadding: 3,
  /** Inline element spacing (e.g. between icon and text) */
  inlineGap: 1.5,
  /** Space between title and subtitle/description */
  titleToBody: 2,
  /** Space between section title and content */
  sectionTitleBottom: 6,
};

/** Container maxWidth usage: 'form' for forms/modals, 'content' for main content (1200px), 'wide' for full content */
export const CONTAINER = {
  form: 'md',    // 960px
  content: 'lg', // 1200px
  wide: 'xl',    // 1536px
};

/** Typography scale — use with theme.typography or sx */
export const TYPOGRAPHY = {
  hero: { xs: '2.5rem', md: '4rem', lg: '5rem' },
  h1: { xs: '2rem', md: '2.75rem', lg: '3rem' },
  h2: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
  h3: { xs: '1.5rem', md: '1.75rem', lg: '2rem' },
  h4: { xs: '1.25rem', md: '1.5rem' },
  body: { xs: '0.9375rem', md: '1rem' },
  bodySmall: '0.875rem',
  caption: '0.75rem',
  overline: { xs: '0.75rem', md: '0.875rem' },
};

/** Button padding and size standards */
export const BUTTON = {
  medium: { py: 1.25, px: 3, fontSize: '1rem' },
  large: { py: 1.5, px: 4, fontSize: '1.0625rem' },
  borderRadius: 2,
};

/** Form field standard (TextField, Select) — use in sx */
export const FORM = {
  labelColor: 'rgba(255,255,255,0.7)',
  borderColor: 'rgba(25,118,210,0.3)',
  borderColorFocus: '#1976d2',
  inputColor: 'white',
  inputStyle: {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: 'rgba(25,118,210,0.3)' },
      '&:hover fieldset': { borderColor: '#1976d2' },
      '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: 2, boxShadow: '0 0 10px rgba(25,118,210,0.3)' },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)',
      '&.Mui-focused': { color: '#1976d2' },
    },
    '& .MuiFormHelperText-root': { color: '#f44336' },
  },
};

/** Brand and semantic colors */
export const COLORS = {
  primary: '#1976d2',
  primaryDark: '#1565c0',
  primaryLight: '#0d47a1',
  background: '#0a0a0a',
  backgroundElevated: 'rgba(18,18,18,0.8)',
  surface: 'rgba(26,26,26,0.9)',
  border: 'rgba(25,118,210,0.2)',
  borderStrong: 'rgba(25,118,210,0.4)',
  text: 'white',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.5)',
  success: '#00e676',
  error: '#f44336',
  warning: '#ff9800',
};

export default {
  SPACING,
  CONTAINER,
  TYPOGRAPHY,
  BUTTON,
  FORM,
  COLORS,
};

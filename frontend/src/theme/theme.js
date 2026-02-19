import { createTheme } from '@mui/material/styles';
import { SPACING, CONTAINER, TYPOGRAPHY, BUTTON, COLORS } from './designSystem';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: COLORS.primary },
    background: {
      default: COLORS.background,
      paper: COLORS.backgroundElevated,
    },
  },
  spacing: SPACING.unit,
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: TYPOGRAPHY.h1.xs, fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: TYPOGRAPHY.h2.xs, fontWeight: 600, lineHeight: 1.25 },
    h3: { fontSize: TYPOGRAPHY.h3.xs, fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: TYPOGRAPHY.h4.xs, fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1.125rem', fontWeight: 600 },
    body1: { fontSize: TYPOGRAPHY.body.xs, lineHeight: 1.6 },
    body2: { fontSize: TYPOGRAPHY.bodySmall, lineHeight: 1.6 },
    caption: { fontSize: TYPOGRAPHY.caption },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': { paddingLeft: 24, paddingRight: 24 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: BUTTON.borderRadius },
        sizeMedium: { paddingTop: 10, paddingBottom: 10, paddingLeft: 24, paddingRight: 24 },
        sizeLarge: { paddingTop: 12, paddingBottom: 12, paddingLeft: 32, paddingRight: 32, fontSize: BUTTON.large.fontSize },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 12 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
    },
    MuiGrid: {
      defaultProps: { spacing: SPACING.gridGap },
    },
  },
});

// Attach design tokens so components can use theme.designSystem
theme.designSystem = {
  SPACING,
  CONTAINER,
  TYPOGRAPHY,
  BUTTON,
  COLORS,
};

export default theme;

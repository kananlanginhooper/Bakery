import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#316059',
    },
    secondary: {
      main: '#c8955e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5eade',
    },
  },
});

export default theme;

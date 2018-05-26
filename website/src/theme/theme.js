import { createMuiTheme } from '@material-ui/core/styles';
import palette from './abstracts/palette';
import typography from './base/typography';

const theme = createMuiTheme({
  palette: palette,
  typography: typography
});

export default theme;

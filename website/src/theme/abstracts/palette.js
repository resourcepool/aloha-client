import style from './paletteExport.scss';

const palette = {
  primary: {
    light: style.colorPrimaryLight,
    main: style.colorPrimary,
    dark: style.colorPrimaryDark,
    contrastText: style.textColorPrimary
  },
  secondary: {
    light: style.colorSecondaryLight,
    main: style.colorSecondary,
    dark: style.colorSecondaryDark,
    contrastText: style.textColorSecondary
  },
  text: {
    primary: style.textColorPrimary,
    secondary: style.textColorSecondary,
    disabled: style.textColorDisabled,
    hint: style.textColorHint,
    error: style.textColorError
  }
};

export default palette;

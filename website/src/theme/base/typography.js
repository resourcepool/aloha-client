import style from './_typography.scss';
import dimens from '../abstracts/dimensExport.scss';
import palette from '../abstracts/paletteExport.scss';

const typography = {
  // Others if we want:
  // https://material-ui-next.com/customization/default-theme/
  headline: {
    fontSize: dimens.textSizeXL,
    fontWeight: style.fontWeightNormal,
    fontFamily: style.fontFamily,
    lineHeight: dimens.textSizeSM,
    color: palette.textColorPrimary
  },
  title: {
    fontSize: dimens.textSizeL,
    fontWeight: style.fontWeightBold,
    fontFamily: style.fontFamily,
    lineHeight: dimens.textSizeXS,
    color: palette.textColorPrimary
  },
  subheading: {
    fontSize: dimens.textSizeMD,
    fontWeight: style.fontWeightNormal,
    fontFamily: style.fontFamily,
    lineHeight: dimens.textSizeL,
    color: palette.textColorSecondary
  },
  body2: {
    fontSize: dimens.textSizeSM,
    fontWeight: style.fontWeightBold,
    fontFamily: style.fontFamily,
    lineHeight: dimens.textSizeXL,
    color: palette.textColorPrimary
  },
  body1: {
    fontSize: dimens.textSizeSM,
    fontWeight: style.fontWeightNormal,
    fontFamily: style.fontFamily,
    lineHeight: dimens.textSizeMD,
    color: palette.textColorPrimary
  }
};

export default typography;

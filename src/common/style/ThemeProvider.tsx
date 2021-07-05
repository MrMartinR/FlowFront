import { colors, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
/* @See {https://github.com/mui-org/material-ui/issues/19655} */
import type {} from '@material-ui/lab/themeAugmentation'

/* See Documentation @link {https://material-ui.com/customization/theming/} */
const theme = createMuiTheme({
  /*
   * ---------------------
   * Typography
   * ---------------------
   */

  typography: {
    fontFamily: ['Poppins'].join(','),
    button: {
      textTransform: 'none',
    },
  },

  /*
   * ---------------------
   * Palette
   * ---------------------
   */

  palette: {
    type: 'light',

    background: {
      paper: '#fff',
      default: '#f4f4f4',
    },

    primary: {
      // light: will be calculated from palette.primary.main,
      // main: '#f4f4f4',
      main: colors.blueGrey[500],
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },

    secondary: {
      // light: will be calculated from palette.primary.main,
      main: colors.deepOrange[500],
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },
    error: {
      // light: will be calculated from palette.primary.main,
      main: '#f44336',
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },
  },

  /*
   * ---------------------
   * Props
   * ---------------------
   */

  props: {
    /* Set default elevation to 0 for popovers */
    MuiPopover: {
      elevation: 0,
    },

    MuiTextField: {
      size: 'small',
      variant: 'outlined',
      margin: 'dense',
    },

    MuiFormControl: {
      variant: 'outlined',
    },

    MuiToggleButtonGroup: {
      size: 'small',
    },

    MuiToggleButton: {
      size: 'small',
    },

    MuiInput: {
      margin: 'dense',
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },

    /* Set default elevation to 0 for cards */
    MuiCard: {
      elevation: 0,
    },

    MuiButton: {
      disableElevation: true,
    },

    /* No more ripple, on the whole application */
    MuiButtonBase: {
      disableRipple: true,
    },

    MuiTooltip: {
      arrow: true,
    },

    /*
     * See @link: {https://github.com/danklammer/bytesize-icons}
     * Since there is a 2px margin between the paths and viewBox, I recommend not having a stroke-width larger than 4px (or 12.5%). 4px might seems small but it's relative to the 32x32 grid.
     * Make sure you use stroke-width in increments of 0.5px or 1.5625%, along with size (height/width) increments of 24px, 32px, 48px, 64px. This allows for optimal pixel-hinting.
     * If you decide to use a larger stroke-width with stroke-linejoin: miter (Squared off style), I recommend using overflow: visible just in case the linecap edge falls just outside the viewBox. This prevents any of the points of the icon from getting cut off.
     */

    MuiSvgIcon: {
      // width: '100%',
      // height: '100%',
      // display: 'inline-block',
      // viewBox: 'inherit',
      viewBox: '0 0 32 32',
      // fontSize: 'large',
      // preserveAspectRatio: 'xMidYMid meet',
      fill: 'none',
      color: 'inherit',
      htmlColor: 'transparent',
      /* stroke */
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
      strokeWidth: '6.25%', // Ultra Light	0.5px	1.5625% | Thin	1px	3.125% | Light	1.5px	4.6875% | Regular	2px	6.25% | Medium	2.5px	7.8125% | Bold	3px	9.375% | Heavy	3.5px	10.9375%
      stroke: colors.blueGrey[500],
    },
  },

  /*
   * ---------------------
   * Overrides
   * ---------------------
   */

  // overrides: {
  // MuiToggleButtonGroup: {
  //   size: 'small',
  // },

  // },
})

export const FlowThemeProvider = (props: any) => {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

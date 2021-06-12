import { colors, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
// import { blueGrey } from '@material-ui/core/colors'

/* See Documentation @link {https://material-ui.com/customization/theming/} */
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins'].join(','),
    button: {
      textTransform: 'none',
    },
  },

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

  props: {
    /* Set default elevation to 0 for popovers */
    MuiPopover: {
      elevation: 0,
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
  },
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

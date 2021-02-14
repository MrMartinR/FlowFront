import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins'].join(','),
  },

  palette: {
    // values 'dark', 'light' (default)
    type: 'light',

    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#fafafa',
      // dark: will be calculated from palette.primary.main,
      // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
    },

    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#f50057',
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
    /* Set default elevation to 1 for popovers */
    MuiPopover: {
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

export function FlowThemeProvider(props: any) {
  const { children } = props

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default FlowThemeProvider

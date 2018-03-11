import { createMuiTheme } from 'mui/styles'

export const dark = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#cfd8dc',
      dark: '#9ea7aa',
      contrastText: '#000',
    },
  },
})

export const darkBlue = createMuiTheme({
  palette: {
    type:'dark',
    primary: {
      main: '#424242',
      light: '#4f5b62',
      dark: '#000a12',
      contrastText: '#fff'
    },
    secondary: {
      main: '#8fa3ad',
      light: '#bfd4df',
      dark: '#61747e',
      contrastText: '#000'
    }
  }
})

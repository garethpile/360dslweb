/* src/App.js */
import React, { useEffect } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import {createMuiTheme , MuiThemeProvider} from  '@material-ui/core';
import MenuAppBar from './Components/MenuAppBar';
import LandingPage from './Pages/LandingPage';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d1646'
    },
    secondary: {
      main: '#1d1646',
    }
  }
  
})


const App = () => {

  useEffect(() => {
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <MenuAppBar />
      <LandingPage />
    </MuiThemeProvider>
  )
}

// export default (App)
export default withAuthenticator(App)

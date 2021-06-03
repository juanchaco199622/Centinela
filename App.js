import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/Navigation/Navigation';
import { ThemeProvider } from 'react-native-elements';

const theme = {
  colors: {
    primary: '#b31d1d',
  },
};

export default function App(){
  return(
    <ThemeProvider theme={theme}>
      <React.Fragment>
          <Navigation/>
      </React.Fragment>
    </ThemeProvider>
  )
}
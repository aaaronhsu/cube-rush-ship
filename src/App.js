import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

import Home from './components/Home';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home></Home>
    </ChakraProvider>
  );
}

export default App;

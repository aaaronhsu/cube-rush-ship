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

import Pagination from './components/Pagination';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Pagination></Pagination>
    </ChakraProvider>
  );
}

export default App;

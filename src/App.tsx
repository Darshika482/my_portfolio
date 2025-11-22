import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LevelUp from './pages/LevelUp';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levelup" element={<LevelUp />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

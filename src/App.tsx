import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LevelUp from './pages/LevelUp';
import LevelUpV2Page from './levelup-v2/LevelUpV2Page';
import FinalProject from './pages/FinalProject';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levelup" element={<LevelUp />} />
          <Route path="/levelup-v2" element={<LevelUpV2Page />} />
          <Route path="/final-project" element={<FinalProject />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

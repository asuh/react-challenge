import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import './App.css';
import { PokemonCacheProvider } from './context/PokemonCacheContext';

const App: React.FC = () => (
  <PokemonCacheProvider>
    <Router>
      <h1><Link to="/">Pokemon List</Link></h1>
      <Routes>
        <Route path="/" element={<PokemonTable />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  </PokemonCacheProvider>
);

export default App;

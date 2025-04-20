import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <h1>Pokemons</h1>
      <Routes>
        <Route path="/" element={<PokemonTable />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

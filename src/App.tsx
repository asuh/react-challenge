import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

const App: React.FC = () => (
  <Router>
    <h1>
      <Link to='/'>Pokemon List</Link>
    </h1>
    <Routes>
      <Route path='/' element={<PokemonTable />} />
      <Route path='/pokemon/:name' element={<PokemonDetails />} />
    </Routes>
  </Router>
);

export default App;

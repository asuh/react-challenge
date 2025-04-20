import { PokemonTable } from './components/PokemonTable';
import './App.css';

const App = (): React.ReactNode => {
  return (
    <>
      <h1>Pokemons</h1>
      <PokemonTable />
    </>
  );
};

export default App;

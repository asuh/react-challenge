import { useEffect } from 'react';
import FetchPokemon from './components/fetchPokemon';
import { PokemonTable } from './components/PokemonTable';
import './App.css';

const App = (): React.ReactNode => {
  const pokemon = FetchPokemon();

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <>
      <h1>Pokemons</h1>
      <PokemonTable />
    </>
  );
};

export default App;

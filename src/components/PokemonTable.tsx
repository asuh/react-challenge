import React, { useEffect, useState } from 'react';
import fetchPokemon from '../hooks/fetchPokemon';
import './PokemonTable.css';

const PokemonTable: React.FC = () => {
  const [pokemon, setPokemon] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const handleFetchPokemon = async () => { 
      setLoading(true);
      setError(null);

      const { error, results } = await fetchPokemon()

      if (ignore) {
        return
      } else if (error) {
        setError(error.message);
      } else {
        setPokemon(results);
      }

      setLoading(false);
    }
    
    handleFetchPokemon();

    return () => { ignore = false; };
  }, []);

  if (loading) return <div className="pokemon-table-container">Loading Pokémon...</div>;
  if (error) return <div className="pokemon-table-error">Error: {error}</div>;

  return (
    <table className="pokemon-table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {pokemon.map((poke) => (
          <tr key={poke.name}>
            <td>{poke.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { PokemonTable };

import { useQuery } from '@tanstack/react-query';
import { PokemonDetails } from '../types/pokemon.types';

import { POKEMON_API_BASE_URL } from '../constants/pokemon.constants';

const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const res = await fetch(`${POKEMON_API_BASE_URL}pokemon/${name}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon details');
  return res.json();
};

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () => fetchPokemonDetails(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 60, // 1 hour
    keepPreviousData: true,
  });
}

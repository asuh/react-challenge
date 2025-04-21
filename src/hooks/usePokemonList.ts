import { useQuery } from '@tanstack/react-query';
import { PAGE_SIZE, POKEMON_API_BASE_URL } from '../constants/pokemon.constants';
import { PokemonListResponse } from '../types/pokemon.types';

const fetchPokemonList = async (offset: number): Promise<PokemonListResponse> => {
  const res = await fetch(`${POKEMON_API_BASE_URL}pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  return res.json();
};

export function usePokemonList(offset: number) {
  return useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => fetchPokemonList(offset),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

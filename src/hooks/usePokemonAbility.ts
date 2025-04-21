import { useQuery } from '@tanstack/react-query';
import { PokemonAbility } from '../types/pokemon.types';

import { POKEMON_API_BASE_URL } from '../constants/pokemon.constants';

const fetchPokemonAbility = async (name: string): Promise<PokemonAbility> => {
  const res = await fetch(`${POKEMON_API_BASE_URL}ability/${name}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon ability');
  const data: PokemonAbility = await res.json();
  return {
    ...data,
    effect_entries: data.effect_entries.filter(entry => entry.language.name === 'en'),
  };
};

export function usePokemonAbility(name: string) {
  return useQuery({
    queryKey: ['pokemonAbility', name],
    queryFn: () => fetchPokemonAbility(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

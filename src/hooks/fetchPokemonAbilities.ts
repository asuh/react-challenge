import { useState, useEffect } from 'react';
import fetchPokemon from './fetchPokemon';
import { usePokemonCache } from '../context/PokemonCacheContext';

interface Ability {
  ability: { name: string; url: string };
}
interface AbilityWithEffect {
  name: string;
  effect: string;
}

async function fetchAbilityEffects(
  abilityData: Ability[],
  abilityCache: Record<string, string>,
  setAbilityEffect: (abilityName: string, effect: string) => void
): Promise<AbilityWithEffect[]> {
  const fetchEffect = async ({
    ability: { name, url }
  }: Ability): Promise<AbilityWithEffect> => {
    if (abilityCache[name]) {
      return { name, effect: abilityCache[name] };
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const detail = await res.json();
      const entry = detail.effect_entries?.find(
        (e: any) => e.language.name === 'en'
      );
      const effect = entry?.effect ?? 'No effect found';
      setAbilityEffect(name, effect);
      return { name, effect };
    } catch {
      const err = 'Error loading effect';
      setAbilityEffect(name, err);
      return { name, effect: err };
    }
  };
  return Promise.all(abilityData.map(fetchEffect));
}

export function usePokemonDetails(name?: string) {
  const [abilities, setAbilities] = useState<AbilityWithEffect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cache, setPokemon, setAbilityEffect } = usePokemonCache();

  useEffect(() => {
    if (!name) return;
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (cache.pokemon[name]) {
          data = cache.pokemon[name];
        } else {
          const result = await fetchPokemon(name);
          if (result.error) throw result.error;
          data = result.data;
          setPokemon(name, data);
        }
        const effects = await fetchAbilityEffects(
          data.abilities || [],
          cache.abilities,
          setAbilityEffect
        );
        if (!ignore) setAbilities(effects);
      } catch (e: any) {
        if (!ignore) setError(e.message || 'Unknown error');
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [name, cache.pokemon, cache.abilities, setPokemon, setAbilityEffect]);

  return { abilities, loading, error };
}

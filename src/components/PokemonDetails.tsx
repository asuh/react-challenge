import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import fetchPokemonDetails from '../hooks/fetchPokemonDetails';
import { usePokemonCache } from '../context/PokemonCacheContext';
import './PokemonDetails.css';

interface Ability {
  ability: { name: string; url: string };
}
interface AbilityWithEffect {
  name: string;
  effect: string;
}

async function fetchAbilityEffects(
  abilityData: Ability[],
  abilityCache: { [abilityName: string]: string },
  setAbilityEffect: (abilityName: string, effect: string) => void
): Promise<AbilityWithEffect[]> {
  return Promise.all(
    abilityData.map(async (ab: Ability) => {
      const cachedEffect = abilityCache[ab.ability.name];
      if (cachedEffect) {
        return { name: ab.ability.name, effect: cachedEffect };
      }
      try {
        const res = await fetch(ab.ability.url);
        if (!res.ok) throw new Error();
        const abilityDetail = await res.json();
        const effectEntry = (abilityDetail.effect_entries || []).find(
          (entry: any) => entry.language.name === 'en'
        );
        const effect = effectEntry ? effectEntry.effect : 'No effect found';
        setAbilityEffect(ab.ability.name, effect);
        return { name: ab.ability.name, effect };
      } catch {
        const errorMsg = 'Error loading effect';
        setAbilityEffect(ab.ability.name, errorMsg);
        return { name: ab.ability.name, effect: errorMsg };
      }
    })
  );
}

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;
  const [abilities, setAbilities] = useState<AbilityWithEffect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cache, setPokemon, setAbilityEffect } = usePokemonCache();

  useEffect(() => {
    const fetchAbilities = async () => {
      setLoading(true);
      setError(null);
      setAbilities([]);
      try {
        let data;
        if (name && cache.pokemon[name]) {
          data = cache.pokemon[name];
        } else {
          const result = await fetchPokemonDetails(name!);
          if (result.error) throw result.error;
          data = result.data;
          setPokemon(name!, data);
        }
        const abilityData = data.abilities || [];
        if (abilityData.length === 0) {
          setAbilities([]);
        } else {
          const effects = await fetchAbilityEffects(abilityData, cache.abilities, setAbilityEffect);
          setAbilities(effects);
        }
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (name) fetchAbilities();
  }, [name]);

  return (
    <div className="pokemon-details-container">
      <h2 className="pokemon-details-title">Selected Pokémon: {name}</h2>
      {loading ? (
        <div>Loading abilities...</div>
      ) : error ? (
        <div className="pokemon-details-error">Error: {error}</div>
      ) : (
        <table className="pokemon-details-table">
          <thead>
            <tr>
              <th>Ability</th>
              <th>Ability Effect</th>
            </tr>
          </thead>
          <tbody>
            {abilities.map((ability) => (
              <tr key={ability.name}>
                <td>{ability.name}</td>
                <td>{ability.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pokemon-details-back-row">
        <Link to={fromPage === 1 ? '/' : `/?page=${fromPage}`} className="pokemon-details-back-link">Back to list view</Link>
      </div>
    </div>
  );
};

export default PokemonDetails;

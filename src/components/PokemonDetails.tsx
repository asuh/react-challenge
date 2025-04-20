import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './PokemonDetails.css';

interface Ability {
  ability: { name: string; url: string };
}
interface AbilityWithEffect {
  name: string;
  effect: string;
}

import fetchPokemonDetails from '../hooks/fetchPokemonDetails';
async function fetchAbilityEffects(abilityData: Ability[]): Promise<AbilityWithEffect[]> {
  return Promise.all(
    abilityData.map(async (ab: Ability) => {
      try {
        const res = await fetch(ab.ability.url);
        if (!res.ok) throw new Error();
        const abilityDetail = await res.json();
        const effectEntry = (abilityDetail.effect_entries || []).find(
          (entry: any) => entry.language.name === 'en'
        );
        return {
          name: ab.ability.name,
          effect: effectEntry ? effectEntry.effect : 'No effect found',
        };
      } catch {
        return { name: ab.ability.name, effect: 'Error loading effect' };
      }
    })
  );
}

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [abilities, setAbilities] = useState<AbilityWithEffect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbilities = async () => {
      setLoading(true);
      setError(null);
      setAbilities([]);
      try {
        const { error, data } = await fetchPokemonDetails(name!);
        if (error) throw error;
        const abilityData = data.abilities || [];
        if (abilityData.length === 0) {
          setAbilities([]);
        } else {
          const effects = await fetchAbilityEffects(abilityData);
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
        <a href={`/?page=${page}`} className="pokemon-details-back-link">Back to list view</a>
      </div>
    </div>
  );
};

export default PokemonDetails;

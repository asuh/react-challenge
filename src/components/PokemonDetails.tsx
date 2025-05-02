import type React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { usePokemonAbility } from '../hooks/usePokemonAbility';
import './PokemonDetails.css';
import SkeletonDetails from './SkeletonDetails';

interface Ability {
  ability: { name: string; url: string };
}

const AbilityRow: React.FC<{ abilityName: string }> = ({ abilityName }) => {
  const { data, isLoading, error } = usePokemonAbility(abilityName);
  return (
    <tr key={abilityName}>
      <td>{abilityName}</td>
      <td>
        {isLoading && 'Loading...'}
        {error && <span className='pokemon-details-error'>Error</span>}
        {data && data.effect_entries.length > 0
          ? data.effect_entries[0].effect
          : data && 'No effect found'}
      </td>
    </tr>
  );
};

import type { PokemonDetails as PokemonDetailsType } from '../types/pokemon.types';

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;
  const { data, isLoading, error } = name
    ? (usePokemonDetails(name) as {
        data: PokemonDetailsType | undefined;
        isLoading: boolean;
        error: Error | null;
      })
    : { data: undefined, isLoading: false, error: null };

  return (
    <section
      className='pokemon-details-container'
      aria-labelledby='pokemon-details-title'
      aria-describedby='pokemon-details-description'
    >
      <h2 className='pokemon-details-title' id='pokemon-details-title'>
        Selected Pokémon: {name}
      </h2>
      {isLoading ? (
        <SkeletonDetails />
      ) : error ? (
        <div className='pokemon-details-error'>
          Error: {error.message || String(error)}
        </div>
      ) : (
        <table className='pokemon-details-table'>
          <caption id='pokemon-details-description' className='visually-hidden'>
            Abilities of {name}
          </caption>
          <thead>
            <tr>
              <th scope='col'>Ability</th>
              <th scope='col'>Ability Effect</th>
            </tr>
          </thead>
          <tbody>
            {(data?.abilities ?? []).map((a: Ability) => (
              <AbilityRow key={a.ability.name} abilityName={a.ability.name} />
            ))}
          </tbody>
        </table>
      )}
      <div className='pokemon-details-back-row'>
        <Link
          to={fromPage === 1 ? '/' : `/?page=${fromPage}`}
          className='pokemon-details-back-link'
        >
          Back to list view
        </Link>
      </div>
    </section>
  );
};

export default PokemonDetails;

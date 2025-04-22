import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { usePokemonAbility } from '../hooks/usePokemonAbility';
import './PokemonDetails.css';

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

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;
  const { data, isLoading, error } = usePokemonDetails(name!);

  return (
    <div
      className='pokemon-details-container'
      tabIndex={0}
      role='region'
      aria-labelledby='pokemon-details-title'
      aria-describedby='pokemon-details-description'
    >
      <h2 className='pokemon-details-title' id='pokemon-details-title'>
        Selected Pokémon: {name}
      </h2>
      {isLoading ? (
        <div>Loading abilities...</div>
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
            {data?.abilities?.map((ab: Ability) => (
              <AbilityRow key={ab.ability.name} abilityName={ab.ability.name} />
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
    </div>
  );
};

export default PokemonDetails;

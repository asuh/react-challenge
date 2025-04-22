import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock the hooks to return the expected data immediately
vi.mock('../hooks/usePokemonDetails', () => ({
  usePokemonDetails: () => ({
    data: {
      abilities: [
        { ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' } },
      ],
    },
    isLoading: false,
    error: null,
  }),
}));
vi.mock('../hooks/usePokemonAbility', () => ({
  usePokemonAbility: () => ({
    data: {
      effect_entries: [
        { effect: 'Powers up Grass-type moves.', language: { name: 'en' } },
      ],
    },
    isLoading: false,
    error: null,
  }),
}));

import PokemonDetails from './PokemonDetails';

test('renders ability name and effect', async () => {
  const screen = render(
    <MemoryRouter initialEntries={['/pokemon/bulbasaur']}>
      <Routes>
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </MemoryRouter>
  );
  const heading = screen.getByText('Selected Pokémon: bulbasaur');
  const ability = screen.getByText('overgrow');
  const effect = screen.getByText('Powers up Grass-type moves.');

  await expect.element(heading).toBeVisible();
  await expect.element(ability).toBeVisible();
  await expect.element(effect).toBeVisible();
});

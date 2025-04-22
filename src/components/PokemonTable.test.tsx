import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter } from 'react-router-dom';
import PokemonTable from './PokemonTable';

vi.mock('../hooks/usePokemonList', () => ({
  usePokemonList: () => ({
    data: {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    },
    isLoading: false,
    error: null
  })
}));

test('renders pokemon names from API', async () => {
  const screen = render(
    <MemoryRouter>
      <PokemonTable />
    </MemoryRouter>
  );
  const bulbasaur = screen.getByText('bulbasaur');
  const ivysaur = screen.getByText('ivysaur');
  await expect.element(bulbasaur).toBeVisible();
  await expect.element(ivysaur).toBeVisible();
});

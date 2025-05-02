import type React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemonList';
import { useQueryClient } from '@tanstack/react-query';
import { POKEMON_API_BASE_URL } from '../constants/pokemon.constants';
import './PokemonTable.css';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ROWS_PER_PAGE = 5;

const PokemonTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = Number.parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(pageParam);

  const offset = 0;
  const { data, isLoading, error } = usePokemonList(offset);

  useEffect(() => {
    if (currentPage === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: String(currentPage) });
    }
  }, [currentPage, setSearchParams]);

  const allPokemon = data?.results || [];

  const totalPages = Math.ceil(allPokemon.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const pageData = allPokemon.slice(startIndex, endIndex);

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handlePrevPage = () => setCurrentPage((page) => Math.max(1, page - 1));
  const handleNextPage = () =>
    setCurrentPage((page) => Math.min(totalPages, page + 1));

  const queryClient = useQueryClient();

  const handleRowHover = (poke: { name: string }) => {
    queryClient.prefetchQuery({
      queryKey: ['pokemonDetails', poke.name],
      queryFn: () =>
        fetch(`${POKEMON_API_BASE_URL}pokemon/${poke.name}`).then(res => res.json()),
    });
  };

  const handleRowClick = (poke: { name: string }) =>
    navigate(`/pokemon/${poke.name}`, { state: { fromPage: currentPage } });

  if (isLoading)
    return <div className='pokemon-table-container'>Loading Pokémon...</div>;
  if (error)
    return (
      <div className='pokemon-table-error'>
        Error: {error.message || String(error)}
      </div>
    );

  return (
    <section
      className='pokemon-table-container'
      aria-labelledby='pokemon-table-title'
    >
      <table className='pokemon-table'>
        <caption id='pokemon-table-title' className='visually-hidden'>
          Pokémon List, five at a time, click to view details
        </caption>
        <thead>
          <tr>
            <th scope='col'>Pokémon Name</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((poke) => (
            <tr key={poke.name}>
              <td>
                <Link to={`/pokemon/${poke.name}`} className='pokemon-table-link'>
                  {poke.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pokemon-table-pagination'>
        <button
          type='button'
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          <span className='visually-hidden'>First Page</span>
          <FirstPageIcon />
        </button>
        <button
          type='button'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <span className='visually-hidden'>Previous Page</span>
          <NavigateBeforeIcon />
        </button>
        <span className='pokemon-table-page-info'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type='button'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <span className='visually-hidden'>Next Page</span>
          <NavigateNextIcon />
        </button>
        <button
          type='button'
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          <span className='visually-hidden'>Last Page</span>
          <LastPageIcon />
        </button>
      </div>
    </section>
  );
};

export default PokemonTable;

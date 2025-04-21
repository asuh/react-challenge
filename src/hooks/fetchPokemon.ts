async function fetchPokemon(name?: string): Promise<{ error: Error | null; data: any }> {
  let response;
  try {
    response = await fetch(`https://pokeapi.co/api/v2/pokemon${name ? `/${name}` : '?limit=250&offset=0'}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error('Network error');
  }

  if (!response.ok) {
    const message = `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  let data: any;
  try {
    data = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API response error: ${error.message}`);
    }
    throw new Error('API response error');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid API response from the API');
  }

  return { error: null, data };
};

export default fetchPokemon;

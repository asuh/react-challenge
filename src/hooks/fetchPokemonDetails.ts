export default async function fetchPokemonDetails(name: string): Promise<{ error: Error | null; data: any }> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    return { error: null, data };
  } catch (error: any) {
    return { error, data: null };
  }
}

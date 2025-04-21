export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

export interface PokemonDetails {
  id: number;
  name: string;
  abilities: Array<{ ability: { name: string; url: string } }>;
}

export interface EffectEntry {
  effect: string;
  language: { name: string };
}

export interface PokemonAbility {
  id: number;
  name: string;
  effect_entries: EffectEntry[];
}

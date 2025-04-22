import React, { createContext, useContext, useMemo, useState } from 'react';

export interface PokemonCache {
  pokemon: { [name: string]: any };
  abilities: { [abilityName: string]: string };
}

interface PokemonCacheContextType {
  cache: PokemonCache;
  setPokemon: (name: string, details: any) => void;
  setAbilityEffect: (abilityName: string, effect: string) => void;
}

const PokemonCacheContext = createContext<PokemonCacheContextType | undefined>(
  undefined
);

export const PokemonCacheProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cache, setCacheState] = useState<PokemonCache>({
    pokemon: {},
    abilities: {}
  });

  const setPokemon = (name: string, details: any) => {
    setCacheState((prev) => ({
      ...prev,
      pokemon: { ...prev.pokemon, [name]: details }
    }));
  };

  const setAbilityEffect = (abilityName: string, effect: string) => {
    setCacheState((prev) => ({
      ...prev,
      abilities: { ...prev.abilities, [abilityName]: effect }
    }));
  };

  const value = useMemo(
    () => ({ cache, setPokemon, setAbilityEffect }),
    [cache]
  );

  return (
    <PokemonCacheContext.Provider value={value}>
      {children}
    </PokemonCacheContext.Provider>
  );
};

export function usePokemonCache() {
  const context = useContext(PokemonCacheContext);
  if (!context) {
    throw new Error(
      'usePokemonCache must be used within a PokemonCacheProvider'
    );
  }
  return context;
}

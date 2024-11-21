import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, selectedIndex }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <div
          key={index}
          style={{
            outline: selectedIndex === index ? '2px solid blue' : 'none',
            borderRadius: '5px',
          }}
        >
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

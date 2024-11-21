import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PokemonCard = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/pokemon/${pokemon.name}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
      }
    };
    fetchDetails();
  }, [pokemon.name]);

  const getInitials = (name) => {
    const words = name.split(' ');
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  };

  return (
    <div className="pokemon-card">
      {details ? (
        <>
          <img src={details.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <div className="abilities">
            {details.abilities.map((ability, index) => (
              <span key={index} className="badge">{ability.ability.name}</span>
            ))}
          </div>
        </>
      ) : (
        <div className="fallback-avatar" style={{ backgroundColor: '#f0f0f0' }}>
          {getInitials(pokemon.name)}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import './styles/App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        setPokemons(data.results);
        setFilteredPokemons(data.results);
      } catch (error) {
        console.error('Erro ao buscar os Pokémons:', error);
      }
    };
    fetchPokemons();
  }, []);

  const handleSearch = (query) => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(filtered);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredPokemons.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      alert(`Você selecionou: ${filteredPokemons[selectedIndex].name}`);
    }
  };

  const focusSearchBar = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      document.getElementById('search-bar').focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', focusSearchBar);
    return () => window.removeEventListener('keydown', focusSearchBar);
  }, []);

  return (
    <div className="app-container" onKeyDown={handleKeyDown} tabIndex="0">
      <h1>Lista de Pokemons</h1>
      <SearchBar onSearch={handleSearch} />
      <PokemonList pokemons={filteredPokemons} selectedIndex={selectedIndex} />
    </div>
  );
};

export default App;

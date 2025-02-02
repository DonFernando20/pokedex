import React, { useState, useEffect } from "react";
import PokemonInfo from "./Components/PokemonInfo";
import "./index.css";
import PokemonList from "./Components/PokemonList";
import pokemonLogo from "./Pokédex_logo.png";

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]); // Displays results
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((response) => response.json())
      .then((data) => setAllPokemon(data.results));
  }, []); // this contains the list of all Pokemon

  const searchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      setPokemon(data);
      console.log(data);

      setPokemonName("");
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setPokemon(null);
    }
  };

  const filteredPokemon = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(pokemonName.toLowerCase())
  ); // This starts as an empty array, then it filters pokemon when filling out the search field

  const handleSelectPokemon = async (url) => {
    try {
      // Fetch details for the selected Pokémon
      const response = await fetch(url);
      const data = await response.json();

      setSelectedPokemon({
        name: data.name,
        id: data.id,
        ability: (
          <ul>
            {data.abilities.map((a) => (
              <li className="results-list"> {a.ability.name} </li>
            ))}
          </ul>
        ),
        type: (
          <ul>
            {data.types.map((a) => (
              <li className="results-list"> {a.type.name} </li>
            ))}
          </ul>
        ),
        sprite: data.sprites.front_default,
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  return (
    <div className="container">
      <div className="secondary-container">
        <img
          src={pokemonLogo}
          alt="Pokemon Logo"
          width={200}
          height={80}
          className="logo"
        />
      </div>
      <div className="secondary-container">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokemon name"
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>

      {filteredPokemon.length > 0 && pokemonName && (
        <ul>
          {filteredPokemon.map((p) => (
            <li
              className="results-list"
              key={p.name}
              onClick={() => {
                handleSelectPokemon(p.url);
                setPokemonName(p.name);
                setPokemonName("");
              }}
            >
              {p.name}
            </li>
            /* <PokemonList
              setPokemonName={setPokemonName}
              p={p}
              searchPokemon={searchPokemon}
              setPokemon={setPokemon}        
            />
            */
          ))}
        </ul> // This displays results as long as > 0 and if it exists
      )}

      {pokemon && <PokemonInfo pokemon={pokemon} />}
      {selectedPokemon && (
        <div>
          <h2 className="results-list">{selectedPokemon.name}</h2>
          <p className="results-list">
            {selectedPokemon.id < 10
              ? `#00${selectedPokemon.id}`
              : selectedPokemon.id < 100
              ? `#0${selectedPokemon.id}`
              : `#${selectedPokemon.id}`}
          </p>
          <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
          {selectedPokemon.type}
          {selectedPokemon.ability}
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;

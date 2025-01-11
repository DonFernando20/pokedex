import React, { useState, useEffect } from "react";
import PokemonInfo from "./Components/PokemonInfo";
import "./index.css";
import PokemonList from "./Components/PokemonList";

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]); // Displays results

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
      setPokemonName("");
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setPokemon(null);
    }
  };

  const filteredPokemon = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(pokemonName.toLowerCase())
  ); // This initiates as an empty array that filters pokemon when filling out the search field

  return (
    <div>
      <h1>Pokedex</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokemon name"
      />
      <button onClick={searchPokemon}>Search Pokemon</button>

      {filteredPokemon.length > 0 && pokemonName && (
        <ul>
          {filteredPokemon.map((p) => (
            <PokemonList setPokemonName={setPokemonName} p={p} />
          ))}
        </ul> // This displays results as long as > 0 and if it exists
      )}

      {pokemon && <PokemonInfo pokemon={pokemon} />}
    </div>
  );
}

export default PokemonSearch;

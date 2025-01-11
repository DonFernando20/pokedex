import React from "react";

function PokemonInfo({ pokemon }) {
  return (
    <div>
      <h2 className="results-list">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li className="results-list" key={index}>
            {ability.ability.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonInfo;

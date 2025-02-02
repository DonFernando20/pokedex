import React from "react";

function PokemonInfo({ pokemon }) {
  return (
    <div>
      <h2 className="results-list">{pokemon.name}</h2>
      {pokemon.id < 10
        ? `#00${pokemon.id}`
        : pokemon.id < 100
        ? `#0${pokemon.id}`
        : `#${pokemon.id}`}
      <ul>
        {pokemon.types.map((type) => (
          <li className="results-list">{type.type.name}</li>
        ))}
      </ul>
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

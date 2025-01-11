function PokemonList({ setPokemonName, p }) {
  return (
    <li
      className="results-list"
      key={p.name}
      onClick={() => setPokemonName(p.name)}
    >
      {p.name}
    </li>
  );
}

export default PokemonList;

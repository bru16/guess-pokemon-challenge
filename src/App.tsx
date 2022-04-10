import { useState } from "react";
import usePokemon from "./hooks/usePokemon";

function App() {
  const [guessed, setGuessed] = useState(false);
  const [pokemonName, setPokemonName] = useState<String>("");

  const { pokemon, loading, setGameOver, setPokemon } = usePokemon();

  const startGame = () => {
    setGuessed(false);
    setGameOver(true);
    setPokemonName("");
    setPokemon(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pokemonName.trim().toLocaleLowerCase() === pokemon?.name) {
      setGuessed(true);
    }
  };

  if (loading) return <div>loading...</div>;

  if (pokemon)
    return (
      <main>
        Who&apos;s that pokemon!
        <img
          src={pokemon.image}
          className={guessed ? "fade-in" : "hidden-img"}
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="nes-field">
            <label htmlFor="name_field">Pokemon name</label>
            <input
              autoFocus
              type="text"
              id="name_field"
              className="nes-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPokemonName(e.target.value)
              }
            />
          </div>
        </form>
        {guessed && (
          <button className="nes-btn is-primary" onClick={() => startGame()}>
            Volver a jugar
          </button>
        )}
      </main>
    );

  return <div>error</div>;
}

export default App;

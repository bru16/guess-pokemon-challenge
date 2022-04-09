import { useEffect, useState } from "react";
import random from "./api";
import { Pokemon } from "./types";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [guessed, setGuessed] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [pokemonName, setPokemonName] = useState<String>("");

  useEffect(() => {
    const fetchPokemon = async () => {
      await random.random().then((res) => {
        setPokemon(res);
        setLoading(false);
      });
    };

    fetchPokemon();
  }, [gameOver]);

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

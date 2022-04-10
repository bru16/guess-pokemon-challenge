import { useState } from "react";
import usePokemon from "./hooks/usePokemon";

function App() {
  const {
    pokemon,
    loading,
    userWin,
    pokemonName,
    guessed,
    startGame,
    handleSubmit,
    setPokemonName,
  } = usePokemon();

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
          <>
            <button className="nes-btn is-primary" onClick={() => startGame()}>
              Volver a jugar
            </button>
            <div>
              {userWin
                ? `Has ganado! partidas ganas: ${localStorage.getItem("win")}`
                : `Has perdido, el pokemon era: ${pokemon.name}`}
            </div>
          </>
        )}
      </main>
    );

  return <div>error</div>;
}

export default App;

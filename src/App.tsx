import usePokemon from "./hooks/usePokemon";

function App() {
  const {
    pokemon,
    loading,
    userWin,
    guessed,
    startGame,
    handleSubmit,
    setPokemonName,
    stats,
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
            <div className="form-input">
              <input
                disabled={guessed ? true : false}
                required
                autoFocus
                type="text"
                id="name_field"
                className="nes-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPokemonName(e.target.value)
                }
              />
              <button
                disabled={guessed ? true : false}
                type="submit"
                className="nes-btn is-primary"
              >
                send
              </button>
            </div>
          </div>
        </form>
        {guessed && (
          <>
            <button
              className="nes-btn game-btn is-primary"
              onClick={() => startGame()}
            >
              Volver a jugar
            </button>
            <div>
              {userWin
                ? `You win, the pokemon was: ${pokemon.name}`
                : `You lost, the pokemon was: ${pokemon.name}`}
            </div>
            <span className="nes-text is-success">wins: {stats.wins}</span>
            <span className="nes-text is-error">losses: {stats.losses}</span>
          </>
        )}
      </main>
    );

  return <div>error</div>;
}

export default App;

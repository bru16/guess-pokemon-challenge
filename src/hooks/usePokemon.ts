import React, { useEffect, useState } from "react";

import random from "../api";
import { Pokemon } from "../types";

const usePokemon = () => {
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guessed, setGuessed] = useState(false);
  const [pokemonName, setPokemonName] = useState<String>("");
  const [userWin, setUserWin] = useState(false);

  const updateStats = (game: Boolean) => {
    const stats = localStorage.getItem("win");

    if (stats) {
      if (game) {
        const victory = parseInt(stats) + 1;
        localStorage.setItem("win", victory.toString());
        return;
      }
      console.log("xd");
      localStorage.setItem("win", "1");
    }
  };

  const startGame = () => {
    fetchPokemon();
    setUserWin(false);
    setGuessed(false);
    setPokemonName("");
    setPokemon(null);
  };

  const fetchPokemon = async () => {
    await random.random().then((res) => {
      setPokemon(res);
      setLoading(false);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pokemonName.trim().toLocaleLowerCase() === pokemon?.name) {
      setGuessed(true);
      setUserWin(true);
      updateStats(true);
    } else {
      updateStats(false);
      setGuessed(true);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    userWin,
    pokemon,
    loading,
    gameOver,
    pokemonName,
    setPokemon,
    setGameOver,
    updateStats,
    fetchPokemon,
    guessed,
    startGame,
    handleSubmit,
    setPokemonName,
  };
};

export default usePokemon;

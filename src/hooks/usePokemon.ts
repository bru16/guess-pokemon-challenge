import React, { useEffect, useState } from "react";

import random from "../api";
import { Pokemon, Stats } from "../types";

const usePokemon = () => {
  const STATS: Stats = JSON.parse(localStorage.getItem("stats") as string) || {
    wins: 0,
    losses: 0,
  };

  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guessed, setGuessed] = useState(false);
  const [pokemonName, setPokemonName] = useState<String>("");
  const [userWin, setUserWin] = useState(false);
  const [stats, setStats] = useState<Stats>(STATS);

  const updateStats = (win: Boolean) => {
    const obj: Stats = win
      ? { ...stats, wins: stats.wins + 1 }
      : { ...stats, losses: stats.losses + 1 };
      
    localStorage.setItem("stats", JSON.stringify(obj));
    setStats(obj);
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
    const isAnswerCorrect =
      pokemonName.trim().toLocaleLowerCase() === pokemon?.name;
    updateStats(isAnswerCorrect);
    setGuessed(true);
    setUserWin(isAnswerCorrect);
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
    stats,
    guessed,
    setPokemon,
    setGameOver,
    updateStats,
    fetchPokemon,
    startGame,
    handleSubmit,
    setPokemonName,
  };
};

export default usePokemon;

import React, { useEffect, useState } from "react";

import random from "../api";
import { Pokemon } from "../types";

const usePokemon = () => {
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      await random.random().then((res) => {
        setPokemon(res);
        setLoading(false);
      });
    };

    fetchPokemon();
  }, [gameOver]);

  return { pokemon, loading, gameOver, setPokemon, setGameOver };
};

export default usePokemon;

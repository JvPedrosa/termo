import { createContext, useState, useEffect, Context } from "react";
import words from "../data/words.json";

interface GameContextType {
  wordToGuess: string;
  currentGuess: string;
  guessedWords: string[];
  normalizedWordToGuess: string;
  setCurrentGuess: (guess: string) => void;
  submitGuess: () => void;
  restartGame: () => void;
}

export const GameContext: Context<GameContextType | null> =
  createContext<GameContextType | null>(null);

const normalize = (word: string) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const getWord = () => words[Math.floor(Math.random() * words.length)];

export const useGame = (): GameContextType => {
  const [wordToGuess, setWordToGuess] = useState<string>(getWord());
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const normalizedWordToGuess: string = normalize(wordToGuess);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "enter") {
        submitGuess();
      } else if (currentGuess.length < 5 && /^[a-z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess]);

  const submitGuess = () => {
    const normalizedGuess = normalize(currentGuess);
    if (
      normalizedGuess.length === 5 &&
      !guessedWords.includes(normalizedGuess)
    ) {
      setGuessedWords((prev) => [...prev, normalizedGuess]);
      setCurrentGuess("");
    }
  };

  const restartGame = () => {
    setWordToGuess(getWord());
    setCurrentGuess("");
    setGuessedWords([]);
  };

  return {
    wordToGuess,
    currentGuess,
    guessedWords,
    normalizedWordToGuess,
    setCurrentGuess,
    submitGuess,
    restartGame,
  };
};

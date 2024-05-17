import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/GameContext";
import { PastGuesses, CurrentGuessDisplay } from "./styles";

const normalize = (word: string) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const WordDisplay: React.FC = () => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return null;
  }

  const { guessedWords, wordToGuess } = gameContext;
  const [currentGuess, setCurrentGuess] = useState("     "); // Inicialize com espaços para ter sempre 5 caracteres
  const [cursorPosition, setCursorPosition] = useState(0);

  const normalizedWordToGuess = normalize(wordToGuess);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          setCursorPosition((oldPos) => Math.max(0, oldPos - 1));
          break;
        case "ArrowRight":
          setCursorPosition((oldPos) => Math.min(5, oldPos + 1));
          break;
        case "Backspace":
          if (cursorPosition > 0) {
            setCurrentGuess(
              currentGuess.slice(0, cursorPosition - 1) +
                " " +
                currentGuess.slice(cursorPosition)
            );
            setCursorPosition((oldPos) => Math.max(0, oldPos - 1));
          }
          break;
        default:
          if (event.key.length === 1 && cursorPosition < 5) {
            setCurrentGuess(
              currentGuess.slice(0, cursorPosition) +
                event.key +
                currentGuess.slice(cursorPosition + 1)
            );
            setCursorPosition((oldPos) => Math.min(5, oldPos + 1));
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, cursorPosition]);

  return (
    <>
      <PastGuesses>
        {guessedWords.map((guessedWord, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            {guessedWord.split("").map((char, idx) => {
              const normalizedChar = normalize(char);
              const isCorrectPosition =
                normalizedChar === normalizedWordToGuess[idx];
              const isInWord = normalizedWordToGuess.includes(normalizedChar);
              const displayClass = isCorrectPosition
                ? "correct"
                : isInWord
                ? "present"
                : "absent";

              return (
                <span key={idx} className={`tile ${displayClass}`}>
                  {char.toUpperCase()}
                </span>
              );
            })}
          </div>
        ))}
      </PastGuesses>
      <CurrentGuessDisplay>
        {currentGuess.split("").map((char, index) => (
          <span
            key={index}
            className="tile"
            style={{
              borderColor: index === cursorPosition ? "blue" : "#d3d6da",
            }}
          >
            {char === " " ? "_" : char.toUpperCase()}
          </span>
        ))}
      </CurrentGuessDisplay>
    </>
  );
};

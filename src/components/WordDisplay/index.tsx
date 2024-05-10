import React, { useContext } from "react";
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

  const { guessedWords, currentGuess, wordToGuess } = gameContext;
  const normalizedWordToGuess = normalize(wordToGuess);

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
        {currentGuess
          .padEnd(5, "_")
          .split("")
          .map((letter, index) => (
            <span key={index} className="tile">
              {letter === "_" ? letter : letter.toUpperCase()}
            </span>
          ))}
      </CurrentGuessDisplay>
    </>
  );
};

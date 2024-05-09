import { useCallback, useEffect, useState } from "react";
import words from "../../data/words.json";
import keys from "../../data/keyboard.json";
import {
  Container,
  HangmanWord,
  Keyboard,
  KeyboardContainer,
  MessageFinal,
} from "./styles";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export const Game = () => {
  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <Container>
      <MessageFinal>
        {isLoser && "You lose!"}
        {isWinner && "You win!"}
      </MessageFinal>

      <HangmanWord>
        {wordToGuess.split("").map((letter, index) => (
          <span style={{ borderBottom: ".1em solid black" }} key={index}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || isLoser
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetters.includes(letter) && isLoser ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </HangmanWord>

      <KeyboardContainer>
        <Keyboard>
          {keys.map((key) => {
            const isActive = guessedLetters.includes(key);
            const isInactive = incorrectLetters.includes(key);
            return (
              <button
                onClick={() => addGuessedLetter(key)}
                className={isActive ? "active" : isInactive ? "inactive" : ""}
                disabled={isInactive || isActive || isWinner || isLoser}
                key={key}
              >
                {key}
              </button>
            );
          })}
        </Keyboard>
      </KeyboardContainer>
    </Container>
  );
};

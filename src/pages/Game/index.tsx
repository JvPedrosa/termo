import { useEffect, useState } from "react";
import words from "../../data/words.json";
import keys from "../../data/keyboard.json";
import {
  Container,
  Keyboard,
  KeyboardContainer,
  MessageFinal,
  CurrentGuessDisplay,
  PastGuesses,
} from "./styles";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export const Game = () => {
  const [wordToGuess] = useState<string>(() => getWord());
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  useEffect(() => {
    setCurrentGuess("");
  }, [wordToGuess]);

  const submitGuess = () => {
    if (currentGuess.length === 5) {
      setGuessedWords((prev) => [...prev, currentGuess]);
      setCurrentGuess("");
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (key === "Enter") {
      submitGuess();
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  return (
    <Container>
      <MessageFinal>
        {guessedWords.includes(wordToGuess)
          ? "You win!"
          : guessedWords.length >= 6
          ? "You lose!"
          : ""}
      </MessageFinal>

      <PastGuesses>
        {guessedWords.map((word, index) => (
          <div key={index}>
            {word.split("").map((char, idx) => (
              <span
                key={idx}
                style={{ color: wordToGuess[idx] === char ? "green" : "red" }}
              >
                {char.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </PastGuesses>

      <CurrentGuessDisplay>
        {currentGuess
          .padEnd(5, "_")
          .split("")
          .map((letter, index) => (
            <span key={index}>{letter.toUpperCase()}</span>
          ))}
      </CurrentGuessDisplay>

      <KeyboardContainer>
        <Keyboard>
          {keys.firstRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              disabled={currentGuess.length === 5}
            >
              {key}
            </button>
          ))}
        </Keyboard>
        <Keyboard>
          {keys.secondRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              disabled={currentGuess.length === 5}
            >
              {key}
            </button>
          ))}
        </Keyboard>

        <Keyboard>
          {keys.thirdRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              disabled={currentGuess.length === 5}
            >
              {key}
            </button>
          ))}
        </Keyboard>

        <div
          style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
        >
          <button onClick={() => handleKeyPress("Enter")}>Submit</button>
          <button onClick={() => handleKeyPress("Backspace")}>{"⌫"}</button>
        </div>
      </KeyboardContainer>
    </Container>
  );
};

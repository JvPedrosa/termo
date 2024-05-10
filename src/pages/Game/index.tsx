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
  const [wordToGuess] = useState<string>(getWord());
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  useEffect(() => {
    setCurrentGuess("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (key === "enter") {
        submitGuess();
      } else if (currentGuess.length < 5 && /^[a-z]$/.test(key)) {
        setCurrentGuess(currentGuess + key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess]);

  const submitGuess = () => {
    if (currentGuess.length === 5 && !guessedWords.includes(currentGuess)) {
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
          ? "Você acertou! A palavra era " + wordToGuess
          : guessedWords.length >= 6
          ? "Você perdeu! A palavra era " + wordToGuess
          : ""}
      </MessageFinal>

      <PastGuesses>
        {guessedWords.map((word, index) => (
          <div key={index}>
            {word.split("").map((char, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor:
                    char === wordToGuess[idx]
                      ? "#0197f6"
                      : wordToGuess.includes(char)
                      ? "#e36322"
                      : "transparent",
                }}
              >
                {char.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </PastGuesses>

      {!guessedWords.includes(wordToGuess) && guessedWords.length < 6 && (
        <CurrentGuessDisplay>
          {currentGuess
            .padEnd(5, "_")
            .split("")
            .map((letter, index) => (
              <span key={index}>{letter.toUpperCase()}</span>
            ))}
        </CurrentGuessDisplay>
      )}

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
          <button onClick={() => handleKeyPress("Backspace")}>⌫</button>
        </div>
      </KeyboardContainer>
    </Container>
  );
};

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

function normalize(word: string) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export const Game = () => {
  const [wordToGuess] = useState<string>(getWord());
  const normalizedWordToGuess = normalize(wordToGuess);
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
    const normalizedGuess = normalize(currentGuess);
    if (
      normalizedGuess.length === 5 &&
      !guessedWords.includes(normalizedGuess)
    ) {
      setGuessedWords((prev) => [...prev, normalizedGuess]);
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
        {guessedWords.includes(normalizedWordToGuess)
          ? "Você acertou! A palavra era " + wordToGuess
          : guessedWords.length >= 6
          ? "Você perdeu! A palavra era " + wordToGuess
          : ""}
      </MessageFinal>

      <PastGuesses>
        {guessedWords.map((guessedWord, index) => (
          <div key={index}>
            {guessedWord.split("").map((char, idx) => {
              const normalizedChar = normalize(char);
              // Verifica se a letra normalizada está na posição correta.
              const isCorrect = normalizedChar === normalizedWordToGuess[idx];
              // Se a letra estiver correta, usa a letra da palavra original com acento.
              const displayChar = isCorrect
                ? wordToGuess[idx]
                : char.toUpperCase();

              return (
                <span
                  key={idx}
                  style={{
                    backgroundColor: isCorrect
                      ? "#0197f6" // Azul para letras corretas na posição certa.
                      : normalizedWordToGuess.includes(normalizedChar)
                      ? "#e36322" // Laranja para letras corretas na posição errada.
                      : "transparent", // Transparente para letras erradas.
                  }}
                >
                  {displayChar}
                </span>
              );
            })}
          </div>
        ))}
      </PastGuesses>

      {!guessedWords.includes(normalizedWordToGuess) &&
        guessedWords.length < 6 && (
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

import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import keys from "../../data/keyboard.json";
import { KeyboardContainer, KeyboardRow } from "./styles";

export const KeyboardComponent: React.FC = () => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return null;
  }

  const { currentGuess, setCurrentGuess, submitGuess } = gameContext;

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (key === "Enter") {
      submitGuess();
    } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }
  };

  return (
    <KeyboardContainer>
      {Object.values(keys).map((row, index) => (
        <KeyboardRow key={index}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              disabled={
                currentGuess.length >= 5 &&
                key !== "Backspace" &&
                key !== "Enter"
              }
            >
              {key}
            </button>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardContainer>
  );
};

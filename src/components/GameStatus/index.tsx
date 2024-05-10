import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { MessageFinal } from "./styles";

export const GameStatus = () => {
  const game = useContext(GameContext);

  if (!game) return null;

  const { guessedWords, normalizedWordToGuess, wordToGuess, restartGame } =
    game;

  return (
    <MessageFinal>
      {(guessedWords.includes(normalizedWordToGuess) ||
        guessedWords.length >= 6) && (
        <button onClick={restartGame}>Jogar Novamente</button>
      )}
      {guessedWords.includes(normalizedWordToGuess)
        ? "Você acertou! A palavra era " + wordToGuess.toLocaleUpperCase()
        : guessedWords.length >= 6
        ? "Você perdeu! A palavra era " + wordToGuess.toLocaleUpperCase()
        : ""}
    </MessageFinal>
  );
};

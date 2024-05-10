import { GameContext, useGame } from "../../context/GameContext";
import { GameStatus } from "../../components/GameStatus";
import { WordDisplay } from "../../components/WordDisplay";
import { KeyboardComponent } from "../../components/Keyboard";
import { Container } from "./styles";

export const Game = () => {
  const game = useGame();

  return (
    <GameContext.Provider value={game}>
      <Container>
        <GameStatus />
        <WordDisplay />
        <KeyboardComponent />
      </Container>
    </GameContext.Provider>
  );
};

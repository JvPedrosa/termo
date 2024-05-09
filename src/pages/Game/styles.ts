import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  align-items: center;
`;

export const MessageFinal = styled.div`
  font-size: 2rem;
  text-align: center;
`;

export const HangmanWord = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 6rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const KeyboardContainer = styled.div`
  align-self: stretch;
`;

export const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  gap: 1rem;

  button {
    width: 100%;
    border: 3px solid black;
    font-size: 2rem;
    text-transform: uppercase;
    padding: 0.5rem;
    font-weight: bold;
    transition: all 0.2s;

    .active {
      background-color: #4caf50;
    }

    .inactive {
      opacity: 0.3;
    }
  }
`;

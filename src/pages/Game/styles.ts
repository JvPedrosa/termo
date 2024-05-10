import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 16px auto;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  position: relative;
`;

export const MessageFinal = styled.div`
  font-size: 2rem;
  text-align: center;
  tranform: uppercase;
`;

export const PastGuesses = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  gap: 0.25rem;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background-color: #615458;
      border-radius: 8px;
    }
  }
`;

export const KeyboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Keyboard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;

  button {
    width: 64px;
    border: 3px solid black;
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 0.8rem;
    font-weight: bold;
    transition: all 0.2s;
    border: 2px solid #444;
    background-color: #888;
    color: white;
    &:disabled {
      background-color: #ccc;
      color: #666;
    }
  }
`;

export const CurrentGuessDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  display: flex;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  justify-content: space-between;

  span {
    width: 48px;
  }
`;

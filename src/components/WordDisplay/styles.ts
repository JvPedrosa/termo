import styled from "styled-components";

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
    justify-content: center;
    gap: 0.25rem;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      border-radius: 8px;
    }

    .correct {
      background-color: #0197f6; /* Azul para letra correta na posição correta */
    }

    .present {
      background-color: #e36322; /* Laranja para letra correta na posição errada */
    }

    .absent {
      background-color: #312a2c; /* Preto para ausente */
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
  justify-content: center;
  gap: 0.25rem;

  span {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 2px solid #d3d6da;
    background-color: #ccc;
    color: #000;
  }
`;

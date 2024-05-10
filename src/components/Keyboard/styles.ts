import styled from "styled-components";

export const KeyboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const KeyboardRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    width: 64px;
    height: 64px;
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 0.8rem;
    font-weight: bold;
    transition: all 0.2s;
    background-color: #888;
    color: white;
    &:disabled {
      background-color: #ccc;
      color: #666;
    }
  }
`;

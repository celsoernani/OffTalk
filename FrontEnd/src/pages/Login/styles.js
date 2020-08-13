import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-color: #0084ff;
  text-align: center;
  height: 100vh;
`;
export const ContainerInputs = styled.div`
  width: 30%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;
export const Title = styled.h1`
  color: white;
  font-size: 80px;
  color: #061826;
`;

export const IoStyle = styled.h2`
  color: white;
  font-size: 60px;
  align-self: center;
`;
export const Input = styled.input`
  padding: 1em;
  margin: 0.5em;
  color: #061826;
  width: 100%;
  margin-bottom: 20px;
  background: white;
  border: none;

  &:focus {
    border: 2px solid #ff36ab;
  }
`;

export const ButtonEnter = styled(Link)`
  padding: 0.5em;
  margin: 0.5em;
  color: white;
  background-color: #061826;
  width: 50%;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background: #ff36ab;
  }
`;

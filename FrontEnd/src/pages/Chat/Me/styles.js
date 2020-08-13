import styled, { css } from 'styled-components';

export const Container = styled.button`
  display: flex;
  height: 20%;
  width: 100%;
  max-height: 100px;
  padding-left: 5%;
  min-height: 50px;
  align-items: center;
  border: 1px solid white;
  background-color: transparent;


  cursor: pointer;

  p {
    color: white;
    font-size: 18px;
  }

  ${props => props.borderColorState && css`
  p {
    color: #B2EF9B

  }
    `}

    ${props => !props.borderColorState && css`
    p {
      color: #E84855

    }
    `};

  &:hover {
    background-color: rgb(0, 132, 255);

  }
`;

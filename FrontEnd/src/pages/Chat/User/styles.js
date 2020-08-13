import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button'
})`
  display: flex;
  width: 100%;
  background: transparent;
  color: white;
  padding: 8% 10%;
  transition: hover 2s;
  font-size: 16px;

  &:hover {
    background:  #ff36ab;
  }

`;

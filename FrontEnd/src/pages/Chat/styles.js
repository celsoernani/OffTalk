import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Container = styled.div`
  height: 100vh;
  flex: 1;
  flex-direction: row;
  display: flex;
`;

export const ContainerChat = styled.div`
  flex: 7;
  border-width: 1px;
  border-color: #ccc;
  border-style: solid;
`;

export const ContainerListUsers = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;


export const List = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  border: 1px solid white;

`;


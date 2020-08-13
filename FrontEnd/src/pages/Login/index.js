import React, { useState } from 'react';
import {
  Container,
  ContainerInputs,
  Title,
  Input,
  ButtonEnter,
  IoStyle,
} from './styles';

export default function Login() {
  const [name, setName] = useState('');
  const verifyName = (e) => {
    if (!name) {
      alert('Preencha seu nome !');
      e.preventDefault();
    }
  };

  return (
    <Container>
      <ContainerInputs>
        <div
          style={{ display: 'flex', flexDirection: 'row', marginBottom: '10%' }}
        >
          <Title>OffTalk</Title>
        </div>
        <Input
          placeholder="Nome"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonEnter onClick={(e) => verifyName(e)} to={`/chat/?name=${name}`}>
          entrar
        </ButtonEnter>
      </ContainerInputs>
    </Container>
  );
}

import React from 'react';

import { Container } from './styles';

function User({user, click}) {
  return(
    <Container onClick = {() => click(user.id)} >
      {user.name}
    </Container>
  );
}

export default User;

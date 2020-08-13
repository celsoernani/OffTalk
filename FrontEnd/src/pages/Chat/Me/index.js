import React from 'react';

import { Container } from './styles';
import './styles.css'


function Me({user, stateUser, setStateUser}) {
  return (
  <div className="dropdown">
    <Container borderColorState = {stateUser?.status}> <p> Voce <b> ( {user.name} ) </b></p>  </Container>
      <div className="dropdown-content">
        <button onClick = {() => {setStateUser({status: true, name: 'online'}); alert(`O ${user.name} está online`)}} type= "button">online</button>
        <button onClick = {() => {setStateUser({status: false, name: 'offline'}); alert(`O ${user.name} está offline`)}} type="button">offline</button>
      </div>
  </div>
  )
}

export default Me;

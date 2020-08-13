import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-web-gifted-chat';
import Me from './Me'
import User from './User'

import { Container, ContainerListUsers, ContainerChat, List } from './styles';

export default function Chat({ socket, user }) {
  const [messages, setMessages] = useState([]);
  const [messagesOff, setMessagesOff] = useState([]);

  const [users, setUsers] = useState([]);
  const [stateUser, setStateUser] = useState();
  const [idShowMessage, setIdShowMessage] = useState(user ? user.id : '')


  useEffect(() => {
    setState();
  },[stateUser, user, socket])

  useEffect(() => {
    if(user){
      socket.emit('getUsers')
      socket.on('newUser', ({users}) => {
        const usersFilter = users.filter((userFilter) => userFilter.name !== user.name)
        setUsers((oldUsers => [...usersFilter]));
    });
    }
  },[socket,user])


  useEffect(() => {
    socket.on('message', (message) => {
      if(message) {
        setMessages((oldMessages) => {
          const testeMessage = message[0];
          const contains = oldMessages.find((oldmessage) => oldmessage.id === testeMessage.id)
          if(contains){
            return oldMessages
          }else {
            return([...message, ...oldMessages])
          }
        }
      );
      }
    });
  }, [socket]);

  const sendMessage = (message) => {
    if (message) {
      socket.emit('sendMessage', message);
          setMessages((oldMessages) => [...message, ...oldMessages]);

    }
  };
  const setState = () => {
    console.log(stateUser)
    if(user && stateUser) {
      if (stateUser.status && stateUser.name === 'online') {
        socket.emit('online', user);
      }
      else if(!stateUser.status && stateUser.name === 'offline') {
        socket.emit('offline', user);
      }

    }

  };

  return (
    <Container>
      <ContainerListUsers>
        {user &&  <Me user={user} stateUser = {stateUser} setStateUser = {setStateUser} />
        }
        <List>
          {users.map((user, index) => (
            <User key={index} user={user} click={setIdShowMessage} />
          ))}
        </List>
      </ContainerListUsers>

      <ContainerChat>
        {user && idShowMessage && (
          <GiftedChat
            renderAvatar={null}
            messages={messages.filter((message) => message.user?.id === idShowMessage || message.user?.id === user.id)}
            placeholder="Digite uma mensagem"
            onSend={(message) => sendMessage(message)}
            user={{
              id: user.id,
            }}
          />
        )}
      </ContainerChat>
    </Container>
  );
}

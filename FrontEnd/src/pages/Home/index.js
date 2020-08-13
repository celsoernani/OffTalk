import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Chat from '../Chat';
import SocketContext from '../../context/socket';

function Home({ socket, location }) {
  const [user, setUser] = useState('');
  const [session, setSession] = useState(false);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket.emit('join', { id: Math.random(), name }, (response) => {
      setUser(response);
    });
    setSession(false);
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search, socket]);
  return (
    <>
      {session ? null : (
        <SocketContext.Consumer>
          {(socket) => <Chat user={user} socket={socket} />}
        </SocketContext.Consumer>
      )}
    </>
  );
}
const HomeComponent = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeComponent;

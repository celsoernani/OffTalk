import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as io from 'socket.io-client';
import GlobalStyle from './styles/global';
import Home from './pages/Home';
import Login from './pages/Login';
import './config/ReacttronConfig';
import SocketContext from './context/socket';

const socket = io('localhost:8000');

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Route path="/" exact component={Login} />
        <Route path="/chat" component={Home} />
      </Router>
    </SocketContext.Provider>
  );
};

export default App;

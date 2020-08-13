import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;

}

body {
    background-color: #061826;
    font-family: 'Roboto Mono', monospace;
    margin: 0;
  }
  button {
    cursor: pointer;
  }


/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #D6D6D6 ;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0084FF;
}
`;

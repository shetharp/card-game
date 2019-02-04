import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import theme from './styles/theme';
import App from './components/App';
import gameBg from './images/game-bg.svg';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: Bahnschrift, 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 300;
    font-size: 1.6rem;
    color: white;
    background: ${theme.board} url(${gameBg});
    box-shadow: inset 0 0 160px rgba(0,0,0,0.2), inset 0 0 240px rgba(0,0,0,0.3);
    margin: 0;
    padding: 0;
  }
  a, a:hover, a:visited, a:focus {
    color: inherit;
    outline: none;
  }
`;

ReactDOM.render(
  (
    <>
      <GlobalStyle />
      <App />
    </>
  ), document.getElementById('root'));

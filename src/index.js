import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import theme from './styles/theme';
import App from './components/App';


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
    background: ${theme.board};
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  (
    <>
      <GlobalStyle />
      <App />
    </>
  ), document.getElementById('root'));

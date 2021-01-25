import { createGlobalStyle } from 'styled-components';

import colors from './colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: ${colors.blue};
    -webkit-font-smoothing: antialiased;
  }
  
  body, input, textarea {
    font: 400 16px 'Roboto', sans-serif; 
    color: ${colors.black};
  }

  input, button, fieldset {
    border: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  button {
    font: 400 16px 'Roboto', sans-serif; 
    cursor: pointer;
  }
  
  a {
    text-decoration: none;
    color: ${colors.white};
  } 
`;

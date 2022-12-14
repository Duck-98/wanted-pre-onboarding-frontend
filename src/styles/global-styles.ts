import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
 html {
      height: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    body {
      background: #E6E9ED;
      margin: 0;
      padding: 0;
      -webkit-overflow-scrolling: touch;
      font-family: 'Noto Sans KR', sans-serif;
      width: 100%;
      height: 100%;
    }

`;

export default GlobalStyle;

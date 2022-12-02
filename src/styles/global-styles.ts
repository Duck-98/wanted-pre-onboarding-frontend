import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
 html {
      height: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-overflow-scrolling: touch;
      font-family: 'Noto Sans KR', sans-serif;
      width: 100%;
      height: 100%;
    }
    @media only screen and (min-width: 769px) {
        width: 400px;
        margin-left: calc(50% - 200px);
      }
`;

export default GlobalStyle;

import { injectGlobal } from "react-emotion";

injectGlobal`
  html, body, p {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: ヒラギノ角ゴ ProN W3, Hiragino Kaku Gothic ProN, メイリオ, Meiryo, sans-serif;
    width: 100%;
    background-color: #fafafa;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
  }

  .ReactModal__Body--open {
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }
`;

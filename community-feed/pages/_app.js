import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segeo UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fire Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return(
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary: #07D6A0;
  --secondary: #354AA8;
  --background: #F2F0F0;
  --font: #4d4c4c;
  --nav-inact: #D8D8D8;
}

* {
  box-sizing: border-box;
}

body {
  background: var(--background);
  font: 0.9rem Helvetica, sans-serif;
  margin: 0;
}

main {
  padding: 6rem 1rem 1rem 1rem;
  position: relative;
  height: 100vh;
}
`;

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary: #07D6A0;
  --secondary: #354AA8;
  --background: #F2F0F0;
  --font: #4d4c4c;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font: 15px Helvetica, sans-serif;
}

main {
  background: var(--background);
  padding: 1rem;
}
`;

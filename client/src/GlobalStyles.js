import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary: #07D6A0;
  --secondary: #354AA8;
  --lightgrey: #F2F0F0;
  --grey: #4d4c4c; 
  --white: #ffffff;
  --signal: #bc1616;
}

* {
  box-sizing: border-box;
}

body {
/*   background-size: cover; */
  background: var(--lightgrey);
  font: 0.9rem Helvetica, sans-serif;
  margin: 0 0 4rem 0;
}

main {
  padding: 6rem 1rem 1rem 1rem;
  position: relative;
}
`;

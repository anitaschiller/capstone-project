```js
import { BrowserRouter as Router } from 'react-router-dom';

const member = {
  firstName: 'Max',
  lastName: 'Mustermann',
  image:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
  description: 'Geschäftsführer',
  entries: [],
};
<Router>
  <Member member={member} />
</Router>;
```

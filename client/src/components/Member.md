```js
import { BrowserRouter as Router } from 'react-router-dom';

const member = {
  firstName: 'Max',
  lastName: 'Mustermann',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  description: 'Geschäftsführer',
  entries: [],
};
<Router>
  <Member member={member} />
</Router>;
```

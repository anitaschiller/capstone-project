import { useState } from 'react';
import styled from 'styled-components';

import Add from './pages/Add';

function App() {
  const [members, setMembers] = useState([]);

  function addMember(member) {
    setMembers([...members, { member }]);
  }

  return (
    <div>
      <main>
        <h1>reMEMBER</h1>
        <Add submitFunction={addMember} />
      </main>
    </div>
  );
}

export default App;

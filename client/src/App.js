import { useState } from 'react';
import styled from 'styled-components';

import Add from './pages/Add';
import Home from './pages/Home';

function App() {
  const [members, setMembers] = useState([]);
  console.log(members);

  function addMember(member) {
    setMembers([...members, member]);
  }

  return (
    <div className="App">
      <main>
        <h1>reMEMBER</h1>
        <Home members={members} setMembers={setMembers} />
        <Add submitFunction={addMember} />
      </main>
    </div>
  );
}

export default App;

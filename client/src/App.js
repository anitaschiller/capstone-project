import { useState, useEffect } from 'react';
import { v4 as uuid4 } from 'uuid';

import Add from './pages/Add';
import Home from './pages/Home';
import { loadFromLocal, saveToLocal } from './lib/localStorage';

function App() {
  const [members, setMembers] = useState(loadFromLocal('members') ?? []);
  const orderedMembers = members.slice().sort(compareFirstName);

  useEffect(() => {
    saveToLocal('members', orderedMembers);
  }, [orderedMembers]);

  function addMember(member) {
    const newMember = { ...member, id: uuid4() };
    setMembers([...members, newMember]);
  }

  function compareFirstName(a, b) {
    if (a.firstName === b.firstName) {
      return 0;
    } else if (a.firstName < b.firstName) {
      return -1;
    } else {
      return 1;
    }
  }

  return (
    <div>
      <main>
        <h1>reMEMBER</h1>
        <Home orderedMembers={orderedMembers} />
        <Add submitFunction={addMember} />
      </main>
    </div>
  );
}

export default App;

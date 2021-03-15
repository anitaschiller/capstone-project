import { useState, useEffect } from 'react';

import Add from './pages/Add';
import Home from './pages/Home';
import { loadFromLocal, saveToLocal } from './lib/localStorage';

function App() {
  const [members, setMembers] = useState(loadFromLocal('memberList') || []);
  console.log(members);
  const orderedMembers = members.slice().sort(compareFirstName);
  console.log('ordered Members', orderedMembers);

  useEffect(() => {
    saveToLocal('members', orderedMembers);
  }, [orderedMembers]);

  function addMember(member) {
    setMembers([...members, member]);
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
    <div className="App">
      <main>
        <h1>reMEMBER</h1>
        <Home orderedMembers={orderedMembers} />
        <Add submitFunction={addMember} />
      </main>
    </div>
  );
}

export default App;

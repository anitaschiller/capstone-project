import { useState } from 'react';

import Add from './pages/Add';
import Home from './pages/Home';

function App() {
  //Variables
  const [members, setMembers] = useState([]);
  console.log(members);
  const orderedMembers = members.slice().sort(compareFirstName);
  console.log('ordered Members', orderedMembers);

  //Functions

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

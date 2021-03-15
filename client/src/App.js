import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import Add from './pages/Add';
import Home from './pages/Home';
import Navigation from './components/Navigation';
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
      <header>
        <h1>reMEMBER</h1>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Home orderedMembers={orderedMembers} />
          </Route>
          <Route path="/add">
            <Add submitFunction={addMember} />
          </Route>
        </Switch>
      </main>
      <Navigation />
    </div>
  );
}

export default App;

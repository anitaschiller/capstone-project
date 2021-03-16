import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import Add from './pages/Add';
import Details from './pages/Details';
import Header from './components/Header';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import { loadFromLocal, saveToLocal } from './lib/localStorage';

function App() {
  const [members, setMembers] = useState(loadFromLocal('members') ?? []);
  const orderedMembers = members.slice().sort(compareFirstName);

  const [fullName, setFullName] = useState('');

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

  function sendFullName(fullName) {
    setFullName(fullName);
  }

  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home orderedMembers={orderedMembers} sendFullName={sendFullName} />
          </Route>
          <Route path="/add">
            <Add submitFunction={addMember} />
          </Route>
          <Route path={`/${fullName}`}>
            <Details />
          </Route>
        </Switch>
      </main>
      <Navigation />
    </div>
  );
}

export default App;

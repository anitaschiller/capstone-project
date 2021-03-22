import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
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

  useEffect(() => {
    saveToLocal('members', orderedMembers);
  }, [orderedMembers]);

  const location = useLocation();
  const member = location?.state?.member ?? null;

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

  function updateMember(updatedMember) {
    const upToDateMembers = members.filter(
      (member) => member.id !== updatedMember.id
    );
    setMembers([...upToDateMembers, updatedMember]);
  }

  return (
    <Wrapper>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home orderedMembers={orderedMembers} />
          </Route>
          <Route path="/add">
            <Add submitFunction={addMember} />
          </Route>
          <Route>
            <Details
              member={member}
              updateMember={updateMember}
              members={members}
            />
          </Route>
        </Switch>
      </main>
      <Navigation />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;

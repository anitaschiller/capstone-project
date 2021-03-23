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

  useEffect(() => {
    saveToLocal('members', members);
  }, [members]);

  const location = useLocation();
  const member = location?.state?.member ?? null;

  function addMember(member) {
    const newMember = { ...member, id: uuid4() };
    setMembers([...members, newMember]);
  }

  function updateMember(updatedMember) {
    const upToDateMembers = members.filter(
      (member) => member.id !== updatedMember.id
    );
    setMembers([...upToDateMembers, updatedMember]);
  }

  function deleteMember(idToDelete) {
    const remainingMembers = members.filter(
      (member) => member.id !== idToDelete
    );
    setMembers(remainingMembers);
  }

  console.log('members', members);
  return (
    <Wrapper>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home members={members} onDeleteMember={deleteMember} />
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

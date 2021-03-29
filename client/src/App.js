import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { v4 as uuid4 } from 'uuid';

import Add from './pages/Add';
import Details from './pages/Details';
import DeletionModal from './components/DeletionModal';
import Header from './components/Header';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import { loadFromLocal, saveToLocal } from './lib/localStorage';

function App() {
  const [members, setMembers] = useState(loadFromLocal('members') ?? []);
  const [isShown, setIsShown] = useState(false);
  const [remainingMembers, setRemainingMembers] = useState(members);

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

  function openModal(idToDelete) {
    setRemainingMembers(members.filter((member) => member.id !== idToDelete));
    setIsShown(true);
  }

  function denyDeletion() {
    setMembers(members);
    setIsShown(false);
  }

  function confirmDeletion() {
    setMembers(remainingMembers);
    setIsShown(false);
  }

  function findCurrentMember() {
    if (member) {
      return members.find((memberToWorkOn) => memberToWorkOn.id === member.id);
    }
  }

  return (
    <Wrapper>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home members={members} onOpenModal={openModal} />
          </Route>
          <Route path="/add">
            <Add submitFunction={addMember} />
          </Route>
          <Route>
            <Details updateMember={updateMember} member={findCurrentMember()} />
          </Route>
        </Switch>
      </main>
      {isShown && (
        <DeletionModal
          denyDeletion={denyDeletion}
          confirmDeletion={confirmDeletion}
        />
      )}
      <Navigation />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;

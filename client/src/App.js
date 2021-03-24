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
  console.log('remainingMebers', remainingMembers);

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
    console.log('deleteMember');
    setRemainingMembers(members.filter((member) => member.id !== idToDelete));
    setIsShown(true);
  }

  function denyDeletion() {
    setMembers(members);
    setIsShown(false);
  }

  function confirmDeletion() {
    console.log('confirmDeletion');
    setMembers(remainingMembers);
    setIsShown(false);
  }

  console.log('members', members);
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
            <Details
              member={member}
              updateMember={updateMember}
              members={members}
            />
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

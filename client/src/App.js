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
  console.log('members', members);
  const [isShown, setIsShown] = useState(false);
  const [remainingMembers, setRemainingMembers] = useState(members);
  const [availableGroups, setAvailableGroups] = useState(
    loadFromLocal('groups') ?? []
  );
  const [canDeleteGroup, setCanDeleteGroup] = useState(true);
  console.log(availableGroups);

  useEffect(() => {
    saveToLocal('members', members);
  }, [members]);

  useEffect(() => {
    saveToLocal('groups', availableGroups);
  }, [availableGroups]);

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

  function addGroup(groupToAdd) {
    setAvailableGroups([...availableGroups, groupToAdd]);
  }

  function deleteGroup(groupToDelete) {
    const groupMembers = members.filter(
      (member) => member.group === groupToDelete
    );
    console.log('groupMembers', groupMembers);
    if (groupMembers.length === 0) {
      const remainingGroups = availableGroups.filter(
        (group) => group !== groupToDelete
      );
      setAvailableGroups(remainingGroups);
    } else {
      setCanDeleteGroup(false);

      setTimeout(function () {
        setCanDeleteGroup(true);
      }, 3000);
    }
  }

  return (
    <Wrapper>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home
              members={members}
              onOpenModal={openModal}
              availableGroups={availableGroups}
              deleteGroup={deleteGroup}
              canDeleteGroup={canDeleteGroup}
              remainingMembers={remainingMembers}
            />
          </Route>
          <Route path="/add">
            <Add
              submitFunction={addMember}
              availableGroups={availableGroups}
              addGroup={addGroup}
            />
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

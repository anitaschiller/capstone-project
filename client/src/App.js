import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

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
  const [idToDelete, setIdToDelete] = useState('');
  const [availableGroups, setAvailableGroups] = useState(
    loadFromLocal('groups') ?? []
  );
  const [showHomeIcon, setShowHomeIcon] = useState(true);
  const [undeletableGroup, setUndeletableGroup] = useState('');

  const location = useLocation();
  const member = location?.state?.member ?? null;

  useEffect(() => {
    fetch('/members')
      .then((result) => result.json())
      .then((members) => setMembers(members))
      .catch((error) => console.error(error.message));

    fetch('/groups')
      .then((result) => result.json())
      .then((groups) => setAvailableGroups(groups))
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    saveToLocal('members', members);
  }, [members]);

  useEffect(() => {
    saveToLocal('groups', availableGroups);
  }, [availableGroups]);

  function addMember(member) {
    fetch('/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: member.firstName,
        lastName: member.lastName,
        description: member.description,
        group: member.group,
        image: member.image,
        entries: member.entries,
      }),
    })
      .then((result) => result.json())
      .then((member) => setMembers([...members, member]))
      .catch((error) => console.error(error.message));
  }

  function updateMember(memberToUpdate) {
    const upToDateMembers = members.filter(
      (member) => member._id !== memberToUpdate._id
    );

    fetch(`/members/${memberToUpdate._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: memberToUpdate.firstName,
        lastName: memberToUpdate.lastName,
        description: memberToUpdate.description,
        group: memberToUpdate.group,
        image: memberToUpdate.image,
        entries: memberToUpdate.entries,
      }),
    })
      .then((result) => result.json())
      .then((memberToUpdate) =>
        setMembers([...upToDateMembers, memberToUpdate])
      );
  }

  function openModal(idToDelete) {
    setIdToDelete(idToDelete);
    setIsShown(true);
  }

  function denyDeletion() {
    setIsShown(false);
  }

  function confirmDeletion() {
    const remainingMembers = members.filter(
      (member) => member._id !== idToDelete
    );

    setMembers(remainingMembers);
    setIsShown(false);

    fetch(`/members/${idToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => console.error(error.message));
  }

  function findCurrentMember() {
    if (member) {
      return members.find(
        (memberToWorkOn) => memberToWorkOn._id === member._id
      );
    }
  }

  function addGroup(groupToAdd) {
    fetch('/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: groupToAdd,
      }),
    })
      .then((result) => result.json())
      .then((groupToAdd) =>
        setAvailableGroups([...availableGroups, groupToAdd])
      )
      .catch((error) => console.error(error.message));
  }

  function deleteGroup(groupToDelete) {
    const groupObjectToDelete = availableGroups.find(
      (group) => group.name === groupToDelete
    );
    console.log('groupObjectToDelete', groupObjectToDelete);

    const groupMembers = members.filter(
      (member) => member.group === groupObjectToDelete.name
    );
    if (groupMembers.length === 0) {
      fetch(`/groups/${groupObjectToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => console.error(error.message));

      const remainingGroups = availableGroups.filter(
        (group) => group.name !== groupToDelete
      );
      console.log('remainingGroups', remainingGroups);
      setAvailableGroups(remainingGroups);
    } else {
      setUndeletableGroup(groupToDelete);

      setTimeout(function () {
        setUndeletableGroup('');
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
              undeleteableGroup={undeletableGroup}
              setShowHomeIcon={setShowHomeIcon}
              undeletableGroup={undeletableGroup}
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
            <Details
              availableGroups={availableGroups}
              updateMember={updateMember}
              member={findCurrentMember()}
              addGroup={addGroup}
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
      <Navigation
        showHomeIcon={showHomeIcon}
        setShowHomeIcon={setShowHomeIcon}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;

import PropTypes from 'prop-types';
import Member from '../components/Member';

export default function Home({ members, onOpenModal }) {
  const orderedMembers = members.slice().sort(compareFirstName);

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
    <>
      <h2>Home</h2>
      {orderedMembers.map((member) => (
        <Member
          key={member.id}
          member={member}
          onOpenModal={() => onOpenModal(member.id)}
        />
      ))}
    </>
  );
}

Home.propTypes = {
  members: PropTypes.array,
  onOpenModal: PropTypes.func,
};

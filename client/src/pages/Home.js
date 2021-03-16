import Member from '../components/Member';

export default function Home({ orderedMembers, sendFullName }) {
  return (
    <>
      <h2>Home</h2>
      {orderedMembers.map((member) => (
        <Member
          key={member.id}
          member={member}
          orderedMembers={orderedMembers}
          sendFullname={sendFullName}
        />
      ))}
    </>
  );
}

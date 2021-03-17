import Member from '../components/Member';

export default function Home({ orderedMembers }) {
  return (
    <>
      <h2>Home</h2>
      {orderedMembers.map((member) => (
        <Member
          key={member.id}
          member={member}
          orderedMembers={orderedMembers}
        />
      ))}
    </>
  );
}

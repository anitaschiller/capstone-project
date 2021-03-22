import Member from '../components/Member';

export default function Home({ orderedMembers, onDeleteMember }) {
  return (
    <>
      <h2>Home</h2>
      {orderedMembers.map((member) => (
        <Member
          key={member.id}
          member={member}
          onDeleteMember={() => onDeleteMember(member.id)}
        />
      ))}
    </>
  );
}

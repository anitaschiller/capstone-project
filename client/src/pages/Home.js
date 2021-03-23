import Member from '../components/Member';

export default function Home({ members, onDeleteMember }) {
  return (
    <>
      <h2>Home</h2>
      {members.map((member) => (
        <Member
          key={member.id}
          member={member}
          onDeleteMember={() => onDeleteMember(member.id)}
        />
      ))}
    </>
  );
}

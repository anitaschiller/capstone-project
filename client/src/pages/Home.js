import ListMember from '../components/ListMember';

export default function Home({ members, setMembers }) {
  return (
    <>
      <h2>Home</h2>
      {members.map((member) => (
        <ListMember member={member} />
      ))}
    </>
  );
}

import ListMember from '../components/ListMember';

export default function Home({ orderedMembers }) {
  return (
    <>
      <h2>Home</h2>
      {orderedMembers.map((member) => (
        <ListMember member={member} />
      ))}
    </>
  );
}

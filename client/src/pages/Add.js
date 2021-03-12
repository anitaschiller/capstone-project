import Form from '../components/Form';

export default function Add({ submitFunction }) {
  return (
    <>
      <h1>Add</h1>
      <Form submitFunction={submitFunction} />
    </>
  );
}

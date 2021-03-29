import PropTypes from 'prop-types';
import Form from '../components/Form';

export default function Add({ submitFunction }) {
  return (
    <>
      <h2>Add</h2>
      <Form submitFunction={submitFunction} />
    </>
  );
}

Add.propTypes = {
  submitFunction: PropTypes.func,
};

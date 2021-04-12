import PropTypes from 'prop-types';
import Form from '../components/Form';

export default function Add({ submitFunction, availableGroups, addGroup }) {
  return (
    <>
      <h2>Add</h2>
      <Form
        submitFunction={submitFunction}
        availableGroups={availableGroups}
        addGroup={addGroup}
      />
    </>
  );
}

Add.propTypes = {
  submitFunction: PropTypes.func,
  availableGroups: PropTypes.array,
  addGroup: PropTypes.func,
};

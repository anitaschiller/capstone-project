const isValidName = (name) => name.length >= 2;
const isValidSelection = (selection) =>
  selection !== '' && selection !== 'Please select...';

const isValidMember = (member) => {
  if (
    isValidName(member.firstName) &&
    isValidName(member.lastName) &&
    isValidSelection(member.group)
  ) {
    return true;
  }
};

export { isValidMember };

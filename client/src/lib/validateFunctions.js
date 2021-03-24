const isValidName = (name) => name.length >= 2;

const isValidSelection = (selection) =>
  selection !== '' && selection !== 'Please select...';

const isValidTitle = (title) => title.length >= 1;

const isValidDate = (date) => {
  if (date.includes('.')) {
    const [day, month, year] = date.split('.');
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isValidMember = (member) => {
  if (
    isValidName(member.firstName) &&
    isValidName(member.lastName) &&
    isValidSelection(member.group)
  ) {
    return true;
  }
};

const isValidEntry = (entry) => {
  if (isValidDate(entry.date) && isValidTitle(entry.title)) {
    return true;
  }
};

export { isValidMember, isValidEntry };

import mongoose from 'mongoose';

const memberSchema = {
  firstName: String,
  lastName: String,
  description: String,
  image: String,
  entries: Array,
};
const Member = mongoose.model('member', memberSchema);

export default Member;

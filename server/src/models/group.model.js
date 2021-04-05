import mongoose from 'mongoose';

const groupSchema = {
  name: String,
};
const Group = mongoose.model('group', groupSchema);

export default Group;

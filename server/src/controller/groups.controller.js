import Group from '../models/group.model.js';

function getGroups(request, response) {
  Group.find()
    .then((groups) => response.json(groups))
    .catch((error) => response.json(error.message));
}

function postGroup(request, response) {
  if (!request.body.name) {
    response.json('No group name available');
  } else {
    const newGroup = new Group({
      name: request.body.name,
    });
    newGroup
      .save()
      .then((group) => response.json(group))
      .catch((error) => response.json(error.message));
  }
}

function deleteGroup(request, response) {
  const idToDelete = request.params.groupId;

  Group.findOneAndDelete({ _id: idToDelete })
    .then(() => response.json(`Group with id ${idToDelete} deleted`))
    .catch((error) => response.json(error.message));
}

export { getGroups, postGroup, deleteGroup };

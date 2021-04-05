import Group from '../models/group.model.js';

function getGroups(request, response) {
  Group.find()
    .then((groups) => response.json(groups))
    .catch((error) => response.json(error.message));
}

function postGroup(request, response) {
  const newGroup = new Group({
    name: request.body.name,
  });

  newGroup
    .save()
    .then((group) => response.json(group))
    .catch((error) => response.json(error.message));
}

function deleteGroup(request, response) {
  const idToDelete = request.params.groupId;

  Group.findOneAndDelete({ _id: idToDelete }).catch((error) =>
    response.json(error.message)
  );
}

export { getGroups, postGroup, deleteGroup };

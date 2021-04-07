import Member from '../models/member.model.js';

function getMembers(request, response) {
  Member.find()
    .then((members) => response.json(members))
    .catch((error) => response.json(error.message));
}

function postMember(request, response) {
  const newMember = new Member({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    description: request.body.description,
    group: request.body.group,
    image: request.body.image,
    entries: request.body.entries,
  });

  newMember
    .save()
    .then((member) => response.json(member))
    .catch((error) => response.json(error.message));
}

function updateMember(request, response) {
  const memberId = request.params.memberId;

  const updatedMember = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    description: request.body.description,
    group: request.body.group,
    image: request.body.image,
    entries: request.body.entries,
  };

  Member.findOneAndUpdate({ _id: memberId }, updatedMember, {
    new: true,
  })
    .then((member) => response.json(member))
    .catch((error) => response.json(error.message));
}

function deleteMember(request, response) {
  const idToDelete = request.params.memberId;

  Member.findOneAndDelete({ _id: idToDelete })
    .then(() => response.json(`Member with id ${idToDelete} deleted`))
    .catch((error) => response.json(error.message));
}

export { getMembers, postMember, updateMember, deleteMember };

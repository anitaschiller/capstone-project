import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import Member from './models/member.model.js';

const connectionString = 'mongodb://localhost:27017/remember-app';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* import productRoutes from './routes/products.routes.js';
import customerRoutes from './routes/customers.routes.js'; */

const server = express();

server.use(bodyParser.json());

server.get('/', (request, response) => {
  response.json({ status: 'Server is up and running' });
});

server.get('/members', (request, response) => {
  Member.find()
    .then((members) =>
      response.json(
        members /* members.length !== 0 ? members : 'No members available' */
      )
    )
    .catch((error) => response.json(error.message));
});

server.post('/members', (request, response) => {
  const newMember = new Member({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    description: request.body.description,
    image: request.body.image,
    entries: request.body.entries,
  });

  newMember
    .save()
    .then((member) => response.json(member))
    .catch((error) => response.json(error.message));
});

server.put('/:memberId', (request, response) => {
  const memberId = request.params.memberId;

  const updatedMember = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    description: request.body.description,
    image: request.body.image,
    entries: request.body.entries,
  };

  Member.findOneAndUpdate({ _id: memberId }, updatedMember, {
    new: true,
  })
    .then((member) => response.json(member))
    .catch((error) => response.json(error.message));
});

server.delete('/:memberId', (request, response) => {
  const idToDelete = request.params.memberId;

  Member.findOneAndDelete({ _id: idToDelete })
    .then((member) => response.json(member))
    .catch((error) => response.json(error.message));
});

/* app.use(productRoutes);
app.use(customerRoutes); */

server.listen(4000, () => console.log('Server started'));

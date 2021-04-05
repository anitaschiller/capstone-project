import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import memberRoutes from './routes/members.routes.js';
import groupRoutes from './routes/groups.routes.js';

const connectionString = 'mongodb://localhost:27017/remember-app';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (request, response) => {
  response.json({ status: 'Server is up and running' });
});

server.use(memberRoutes);
server.use(groupRoutes);

server.listen(4000, () => console.log('Server started'));

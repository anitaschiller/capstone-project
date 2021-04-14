import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { dirname } from './lib/pathHelpers.js';

import memberRoutes from './routes/members.routes.js';
import groupRoutes from './routes/groups.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';

const __dirname = dirname(import.meta.url);

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'remember-app';

const DB_CONNECTION =
  process.env.DB_CONNECTION + `${DB_NAME}?retryWrites=true&w=majority` ||
  `mongodb://localhost:27017/${DB_NAME}`;

/* const DB_CONNECTION =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/remember-app'; */

const connectionString = DB_CONNECTION;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use(memberRoutes);
server.use(groupRoutes);
server.use(maintenanceRoutes);

server.use(express.static(path.join(__dirname, '../../client/build')));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));

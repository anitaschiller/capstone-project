import express from 'express';
import {
  getGroups,
  postGroup,
  deleteGroup,
} from '../controller/groups.controller.js';

const router = express.Router();

router.get('/groups', getGroups);
router.post('/groups', postGroup);
router.delete('/groups/:groupId', deleteGroup);

export default router;

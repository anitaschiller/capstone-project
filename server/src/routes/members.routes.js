import express from 'express';
import {
  getMembers,
  postMember,
  updateMember,
  deleteMember,
} from '../controller/members.controller.js';

const router = express.Router();

router.get('/members', getMembers);
router.post('/members', postMember);
router.put('/members/:memberId', updateMember);
router.delete('/members/:memberId', deleteMember);

export default router;

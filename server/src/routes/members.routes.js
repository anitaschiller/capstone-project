import express from 'express';
import {
  getMember,
  postMember,
  updateMember,
  deleteMember,
} from '../controller/members.controller.js';

const router = express.Router();

router.get('/members', getMember);
router.post('/members', postMember);
router.put('/:memberId', updateMember);
router.delete('/:memberId', deleteMember);

export default router;

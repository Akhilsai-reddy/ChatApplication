import express from 'express';
import { protectedRout } from '../Middleware/auth.protectedRout.js';
import { getAllUsers, getMessages, sendMessage } from '../Controllers/messages.controller.js';

const router = express.Router();

router.get('/users',protectedRout,getAllUsers);
router.get('/:id',protectedRout,getMessages);
router.post('/send/:id',protectedRout,sendMessage);

export default router;
const express = require('express');
const router = express.Router();

const { createMesssage , getMesssages, likeMessage,updateMessage,editMessage,deleteMessage,getMessageById,getMessageByPseudo} = require('../controllers/messageController');


router.post('/Message', createMesssage)
router.get('/Message/Liste', getMesssages)
router.get('/Message/LikeMessage/:id', likeMessage)
// router.get('/Message/EditMessage/:id', editMessage);
// router.post('/Message/EditMessage/:id', updateMessage);
router.put('/Message/EditMessage/:id', updateMessage);

 router.delete('/Message/DeleteMessage/:id', deleteMessage)
 router.get('/Message/:id',getMessageById);
 router.get('/Message/getMessageByPseudo/:pseudo',getMessageByPseudo)
module.exports = router;
const Message = require('../models/MessageSchema')


// create avec postman elle marche
const createMesssage = async (req, res) => {
    try {
        const { pseudo, content } = req.body;
        let message = new Message({ pseudo, content });
        await message.save();
     
        res.status(200).json({ message: 'Message created successfully' });

        // // Redirection vers la liste des messages
        // res.redirect('/Message/Liste');
    } catch (error) {
        return res.status(500).json({ error });
    }
}

   //getMessages avec postman elle marche
   const getMesssages= async (req, res) => {
    try {
      const messages = await Message.find({});
      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error });
    }
  };


  //with postman
  const editMessage = async (req, res) => {
    try {
      const { id } = req.params;
      const message = await Message.findById(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  //with postman
  const getMessageById = async (req, res) => {
    const { id } = req.params;
    try {
      const message = await Message.findById(id);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const getMessageByPseudo = async (req, res, next) => {
    try {
      const { pseudo } = req.params;
      const message = await Message.findOne({ pseudo });
 
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
     
      }
 
      res.status(200).json(message);
   
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Error retrieving message' });
    }
 };

 const  deleteMessage = async (req, res, next) => {
  try {
    const deletedMessage = await Message.findByIdAndRemove(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting message' });
  }
};

/////////////////////////////////// ça ce n'est pas avec postman ////////////////

//marche mais pas avec postman
// const getMesssages = async (req, res) => {
//     try {
//       const messages = await Message.find({});
//       res.status(200).json({ message: ' successfully' });
//       // res.render('listMessage', { messages }); // Rendre la vue avec les données des messages
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };
  
//marche mais sans postman  
  const likeMessage = async (req, res) => {
    const { id } = req.params;
    const message = await Message.findById(id);
    message.likes++;
    await message.save();
    res.redirect('/Message/Liste');
  };
//hethi l update lezem temchi maaha l edit li tahtha , w zouz sans postman  
  const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { pseudo, content } = req.body;
    await Message.findByIdAndUpdate(id, { pseudo, content });
    res.redirect('/Message/Liste');
  };
  
  // const editMessage = async (req, res) => {
  //   const { id } = req.params;
  //   const message = await Message.findById(id);
  //   res.render('editMessage.twig', { message });
  // };
//hethi sans postman
  //  const deleteMessage = async (req, res) => {
  //    const { id } = req.params;
  //    await Message.findByIdAndDelete(id);
  //    res.status(200).json({ message: 'Message deleted successfully' });
  //   //  res.redirect('/Message/Liste');
  //  }


module.exports = {  getMesssages, createMesssage,likeMessage,updateMessage,editMessage,deleteMessage,getMessageById,getMessageByPseudo};
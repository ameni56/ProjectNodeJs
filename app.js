const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
const Message = require('./models/MessageSchema');
const messageRoutes = require('./routes/messageRoutes');
const professeurRoutes = require('./routes/professeurRoutes');
const platRoutes = require('./routes/platRoutes');
const app = express();
const connectDB = require('./config/dbConfig');
const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("A user connected");
  io.emit("userConnected", "A new user is connected"); // Emit to all connected clients

  socket.on("msg", async (message) => {
    try {
      const { pseudo, content } = message;
      let newMessage = new Message({ pseudo, content });
      await newMessage.save();
      io.emit("msg", newMessage); // Emit the saved message to all connected clients
    } catch (error) {
      console.error("Error saving message to the database:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    io.emit("userDisconnected"); // Emit the "userDisconnected" event to all connected clients
  });
//typing
  socket.on("typing", (user) => {
    io.emit("typing", user); // Emit the "typing" event to all connected clients
  });

    // Add socket event listeners for other CRUD operations (update, delete, etc.)
  // Example:

  socket.on("messageAdded", () => {
    io.emit("notification", "A message has been added"); // Emit notification to all connected clients
  }); 
  // socket.on("messageUpdated", () => {
  //   io.emit("notification", "A message has been updated"); // Emit notification to all connected clients
  // });

  // socket.on("messageDeleted", () => {
  //   io.emit("notification", "A message has been deleted"); // Emit notification to all connected clients
  // });
});



app.use('/', messageRoutes);
app.use('/', professeurRoutes);
app.use('/', platRoutes);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.get('/Message', (req, res) => {
  res.render('Addmessage');
});

app.get('/msg', (req, res) => {
  res.render('chat');
});
//professeur
app.get('/Professeur', (req, res) => {
  res.render('Addprofesseur');
});
//professeur
app.get('/Plat', (req, res) => {
  res.render('Addplat');
});

// server.listen(3000, async () => {
//   connectDB();
//   console.log('Listening on port 3000');
// });
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  server.listen(3001, () => {
    console.log('Server is running on port 3000');
  });
  // Start your application or perform database operations
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = app;

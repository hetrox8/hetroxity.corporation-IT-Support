require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const app = express();

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Models
const Contact = require('./models/contact');
const Chat = require('./models/chat');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/pricing', (req, res) => res.render('pricing'));
app.get('/contact', (req, res) => res.render('contact'));

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.redirect('/contact?success=true');
  } catch (error) {
    res.redirect('/contact?success=false');
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`));

// Socket.io setup
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chatMessage', async (msg) => {
    const newChat = new Chat(msg);
    await newChat.save();
    io.emit('message', msg);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

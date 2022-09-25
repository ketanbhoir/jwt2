const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const User = require('./model/user');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/login-jwt-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyparser.json());

app.post('/api/register', async (req, res) => {
  //   console.log(req.body);
  // get UN & pass
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' });
  }
  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'password too small. shud be atleast 6 char ',
    });
  }
  //   hash them
  const password = await bcrypt.hash(plainTextPassword, 10);

  //   to create auser
  try {
    const response = await User.create({
      username,
      password,
    });
    console.log('user created successfully:', response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'username already exist' });
    }
    throw error;
  }
  //   const password = await bcrypt.hash(password, 10);
  res.json({ status: 'ok' });
});

app.listen(9999, () => {
  console.log('server up at 9999');
});

const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const User = require('./model/user');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login-jwt-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyparser.json());

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  res.json({ status: 'ok' });
});

app.listen(9999, () => {
  console.log('server up at 9999');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mytestdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
});

newUser.save().then(() => {
  console.log('User saved successfully!');
  mongoose.connection.close();
}).catch((error) => {
  console.error('Error saving user:', error);
});

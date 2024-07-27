# URL SHORTENER

## Mongoose

Mongoose is an Object Data Modeling (ODM) libray for your MongoDB collections.

### Schema Definition:

Mongoose allows you to define schemas for your MongoDB collections.
A schema defines the structure of documents within a collection, including the fields, their types and any validation rules.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name: String,
email:
{
type: String,
required: true,
unique: true
},
{
age: Number
}
});

### Models:

Once a schema is defined, we can create a model based on that schema, Models are used to create and interact with documents in the mongoDB collections...

const User = mongoose.model('User', userSchema);

### Data operations:

Mongoose provides methods to perform CRUD(Create, Read, Update, Delete) opetations on MongoDb documents.

### Create

const newUser = new User({
name: 'Sabin',
email: 'shrestha.sabin.er@gmail.com'
age: 19,
})

### Read

User.find({ name: 'Sabin'}, (err, users)=>{
if(err) throw err;
console.log(users);
})

### Update

User.updateOne({ name: 'Sabin' }, { age: 20 }, (err, result) => {
if (err) throw err;
console.log(result);
});

### Delete:

User.deleteOne({
name: 'Sabin'
}, (err)=>{
if(err) throw error;
console.log('User deleted');
})

### Installation

npm install mongoose

### Connecting to MongoDB:

mongoose.connect(url).then({
console.log("Connected successfully!")
})

 ### Mongoose abstracts many of the complexities involved in interacting with MongoDB, making it easier to work with data in a structured way. 

### Parsing

Parsing, in the context of web development, refers to, euta string of data lai more structured format ma convert garne so that certain program can understand and manipulate that data... data lai interpret garne, components ma break garne that follows a specific syntax or structure allowing for easier access and processing.

Parsing is imp for data manipulation, validation and security, efficiency.
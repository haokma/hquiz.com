const mongoose = require('mongoose');

const connectDatabase = () => {
  const mongoDbUrl =
    'mongodb+srv://admin:admin123456@cluster0.iuzzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  mongoose.Promise = global.Promise;

  // Connecting to the database
  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};

module.exports = connectDatabase;

const chalk = require('chalk');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const connectDB = async () => {
  const DB = process.env.DATABASE_CONNECTION.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  mongoose.set('autoIndex', true);

  const con = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true
  });

  console.log(
    chalk.bgGreen.black(`MongoDB Connected: ${con.connection.host}.`)
  );

  mongoose.connection.on('connecting', () => {
    console.log(chalk.bgGreen.black('Connecting to Database'));
  });

  mongoose.connection.on('connected', () => {
    console.log(chalk.bgGreen.black('Mongoose Connected to Database'));
  });

  mongoose.connection.on('error', (err) => {
    console.log(chalk.bgGreen.black(err.message));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(chalk.bgGreen.black('Mongoose Connection is Disconnected.'));
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

module.exports = connectDB;

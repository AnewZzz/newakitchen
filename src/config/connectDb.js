import mongoose from 'mongoose';
import CONFIG from './index';

async function ConnectDb() {
  try {
    await mongoose.connect(CONFIG.db);
    console.log('Connected to mongoose');
  } catch (error) {
    console.log('Error while connecting to mongoose', error);
  }
}

export default ConnectDb;

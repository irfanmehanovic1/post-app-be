import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { CONFIG } from './core/config';
import router from './routes';


const initialize = async () => {
  try {
    const { DB_URL } = CONFIG;
    if (!DB_URL) throw Error('Application required mongoDB connection, missing DB_URL');
    await mongoose.connect(CONFIG.DB_URL || '');

    console.log('Successfully connected to database');

    const app = express();
    app.use(bodyParser.json());
    
    app.use('/api/v1/', router);

    if (process.env.NODE_ENV !== 'dev') {
      app.listen(CONFIG.PORT);
      console.log('App running on port:', CONFIG.PORT);
    }
    return app;
  } catch (e) {
    console.error('Problem with running server:', e);
  }
};

export default initialize();

import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env' });

export const CONFIG = {
    PORT: process.env.PORT || 5050,
    DB_URL: process.env.MONGO_URL,
    TOKEN_KEY: process.env.TOKEN_KEY
};
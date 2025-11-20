import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
  
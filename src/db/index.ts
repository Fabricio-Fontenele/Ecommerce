import "dotenv/config"; // 8.8k(gzipped: 3,7k)

import { drizzle } from "drizzle-orm/node-postgres"; // 60.5k (gzipped: 16.1k)
export const db = drizzle(process.env.DATABASE_URL!);

import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/lib/env";

import * as schema from "./schema";

const createDb = () => drizzle(env.databaseUrl(), { schema });

let dbInstance: ReturnType<typeof createDb> | undefined;

export const getDb = () => {
  dbInstance ??= createDb();

  return dbInstance;
};

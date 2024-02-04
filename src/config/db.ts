import { Pool, QueryResult } from "pg";
import { config } from "dotenv";
import { createPostsTable, createUsersTable } from "./dbTablesConfig";

config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T[]> => {
  const client = await pool.connect();
  try {
    const result: QueryResult = await client.query(query, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
};

createUsersTable(executeQuery);
createPostsTable(executeQuery);

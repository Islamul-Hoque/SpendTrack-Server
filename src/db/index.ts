import { Pool } from "pg";
import config from "../config";

// PostgreSQL connection pool using Neon cloud database
export const pool = new Pool({
    connectionString: config.connection_string,
});

// Setup PostgreSQL schema and create table if it doesn't exist
export const initDB = async () => {
    try {

        // create 'users' table
        await pool.query(`

        `)
        console.log("Database connected successfully!");

        // create 'profile' table
        await pool.query(`

        `)
    } catch (error) {
        console.log(error);
    }
}

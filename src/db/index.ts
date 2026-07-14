import { Pool } from "pg";
import config from "../config";

// PostgreSQL connection pool using Neon Cloud Database
export const pool = new Pool({
    connectionString: config.connection_string,
});

// Initialize PostgreSQL database schema
export const initDB = async () => {
    try {
        // 1. Users table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,

        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT,
        google_id VARCHAR(255) UNIQUE,

        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        role VARCHAR(20) NOT NULL DEFAULT 'user',

        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);

        // 2. Profiles table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles (
        id BIGSERIAL PRIMARY KEY,

        user_id BIGINT UNIQUE NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

        phone VARCHAR(20),
        avatar_url TEXT,

        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);

        // 3. Categories table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS categories (
        id BIGSERIAL PRIMARY KEY,

        user_id BIGINT NOT NULL 
        REFERENCES users(id) ON DELETE CASCADE,

        name VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        UNIQUE(user_id, name)
        );
    `);

        // 4. Expenses table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS expenses (
        id BIGSERIAL PRIMARY KEY,

        user_id BIGINT NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

        category_id BIGINT
        REFERENCES categories(id) ON DELETE SET NULL,

        product_name VARCHAR(150) NOT NULL,
        amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),

        expense_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);

        console.log("Database connected and tables initialized successfully!");
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
};
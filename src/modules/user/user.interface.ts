export interface IUser {
    id: string;              // BIGSERIAL PRIMARY KEY

    name: string;            // VARCHAR(100) NOT NULL
    email: string;           // VARCHAR(255) UNIQUE NOT NULL
    password_hash?: string;  // TEXT (hashed password)
    google_id?: string;      // VARCHAR(255) UNIQUE

    is_active: boolean;      // BOOLEAN NOT NULL DEFAULT TRUE
    role: "admin" | "user";  // VARCHAR(20) NOT NULL DEFAULT 'user'

    created_at: Date;        // TIMESTAMPTZ NOT NULL DEFAULT NOW()
    updated_at: Date;        // TIMESTAMPTZ NOT NULL DEFAULT NOW()
}
export const USER_ROLE = {
    admin: "admin",
    user: "user",
} as const;

// export type ROLES = "admin" | "agent" | "user";
export type ROLES = (typeof USER_ROLE)[keyof typeof USER_ROLE];
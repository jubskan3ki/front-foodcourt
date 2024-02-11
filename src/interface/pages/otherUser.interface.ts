export interface User {
    id: number;
    username: string;
    email: string;
    description: string;
}

export type UserParams = Record<string, string | undefined>;

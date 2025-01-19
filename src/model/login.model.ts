import { z } from "zod";

export class LoginUserRequest {
    username: string;
    password: string;
}

export const loginUserRequestValidation = z.object({
    username: z.string().min(3,'Username must be at least 3 characters').max(10, 'Username maximum contain only 10 characters'),
    password: z.string().min(6,'Password must be at least 6 characters').max(10 , 'Password maximum contain only 10 characters'),
})
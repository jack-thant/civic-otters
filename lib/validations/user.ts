import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().min(1),
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    dateOfBirth: z.date(),
    interests: z.string().array().nonempty(),
    role: z.string().min(1)
})
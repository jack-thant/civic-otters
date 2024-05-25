"use server"

import { connectToDB } from '../mongoose';
import { User } from '../models/userModel';

// export async function fetchAllUsers() {
//     try {
//         connectToDB();

//         return await User.find();
//     } catch (error: any) {
//         throw new Error(`Failed to fetch user: ${error.message}`);
//     }
// }
export async function fetchAllUsers() {
    try {
        await connectToDB();
        const users = await User.find();
        return users.map(user => user.toObject()); // Convert Mongoose documents to plain objects
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}


export async function addNewUser(
    userData: typeof User
) {
    try {
        await connectToDB();

        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser ? savedUser.toObject() : null;
    } catch (err: any) {
        throw new Error(`Failed to add new user: ${err.message}`);
    }
};

export async function getUser(userId: string) {
    try {
        await connectToDB();
        const user = await User.findById(userId);
        return user ? user.toObject() : null;
    } catch (err: any) {
        throw new Error(`Failed to fetch user: ${err.message}`);
    }
}

export async function deleteUser(
    userId: String
) {
    try {
        await connectToDB();
        await User.deleteOne({ _id: userId });
        return { message: 'Successfully deleted User' };
    } catch (err: any) {
        throw new Error(`Failed to delete user: ${err.message}`);
    }
};

export async function getUserByEmail(
    email: String
) {
    try {
        await connectToDB();
        const user = await User.findOne({ email }, '_id');
        if (!user) {
            throw new Error('User not found');
        }
        return { userId: user._id };
    } catch (err: any) {
        throw new Error(`Failed to fetch user by email: ${err.message}`);
    }
};

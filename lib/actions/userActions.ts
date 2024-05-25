"use server"

import { connectToDB } from '@/lib/mongoose';
import User from '@/lib/models/userModel';

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

export async function getUserFriends(userId: string) {
    try {
        await connectToDB();
        
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Extract friend IDs from the user's friends array
        const friendIds = user.friends;

        // Find users with friend IDs
        const friends = await User.find({ _id: { $in: friendIds } });

        // Return friends as plain objects
        return friends.map(friend => friend.toObject());
    } catch (err: any) {
        throw new Error(`Failed to fetch user friends: ${err.message}`);
    }
}

export async function checkName(name: string) {
    try {
        await connectToDB();
        
        // Find the user by name
        const user = await User.findOne({ name });
        return user ? user.toObject() : null;
    } catch (err: any) {
        throw new Error(`Failed to check user name: ${err.message}`);
    }
}

"use client"

import { fetchAllUsers, getUser, getUserByEmail, addNewUser } from '@/lib/actions/userActions';
import User from '@/lib/models/userModel';

function MyComponent() {

    const handleFetchUsers = async () => {
        try {
            const usersJSON = await fetchAllUsers();
            console.log(usersJSON)
        } catch (error) {
            console.log("An error occurred while fetching users:", error);
        }
    };

    const handleGetUser = async (userId: string) => {
        try {
            const fetchedUser = await getUser(userId);
            console.log(fetchedUser);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleGetUserByEmail = async (email: string) => {
        try {
            const fetchedUser = await getUserByEmail(email);
            console.log(fetchedUser);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const newUser: typeof User = {
        email: "pear@example.com",
        userImage: "https://example.com/pear.jpg",
        password: "passwordABC",
        isNewUser: true,
        name: "pear pear",
        DOB: "1975-11-15",
        userType: 0,
        friends: [],
        achievements: [],
        interests: ["Gardening", "DIY", "Sculpture"],
        requested: [],
        pending: []
    };

    const handleAddNewUser = async (user: typeof User) => {
        try {
            const createdUser = await addNewUser(user);
            console.log(createdUser);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <button style={{border: "1px black solid"}} onClick={handleFetchUsers}>Fetch All Users</button> <br />

            <button style={{border: "1px black solid"}} onClick={() => handleGetUser('66519ca5d021f3503872d071')}>Get User by ID</button> <br />

            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByEmail('john@example.com')}>Get User By Email</button> <br />

            <button style={{border: "1px black solid"}} onClick={() => handleAddNewUser(newUser)}>Add User</button><br />
        </div>
    );
}

export default MyComponent;
"use client"

import { fetchAllUsers, getUser, getUserByEmail, addNewUser } from '@/lib/actions/userActions';
import { useState } from 'react';
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
            <button onClick={handleFetchUsers}>Fetch Users</button> <br />
            <button onClick={() => handleGetUser('66519ca5d021f3503872d071')}>Get User</button> <br />
            <button onClick={() => handleGetUserByEmail('john@example.com')}>Get User By Email</button> <br />
            <button onClick={() => handleAddNewUser(newUser)}>Add User</button> <br />
        </div>
    );
}

export default MyComponent;

// 'use client';

// import { useState } from 'react';
// import { addNewUser, getUser, deleteUser, getUserByEmail } from '@/lib/actions/userActions';
// import type { User as UserType } from '@/lib/models/userModel';

// type UserData = {
//     name: string;
//     email: string;
//     password: string;
//     DOB: string;
//     userImage: string;
//     isNewUser: boolean;
//     userType: number;
//     friends?: string[];
//     achievements?: string[];
//     interests?: string[];
//     events?: string[];
//     requested?: string[];
//     pending?: string[];
// };

// function MyComponent() {
//     const [user, setUser] = useState<UserType | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const handleAddUser = async (userData: UserData) => {
//         try {
//             const newUser = await addNewUser(userData);
//             setUser(newUser);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     const handleGetUser = async (userId: string) => {
//         try {
//             const fetchedUser = await getUser(userId);
//             setUser(fetchedUser);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     const handleDeleteUser = async (userId: string) => {
//         try {
//             await deleteUser(userId);
//             setUser(null);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     const handleGetUserByEmail = async (email: string) => {
//         try {
//             const { userId } = await getUserByEmail(email);
//             await handleGetUser(userId);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <button onClick={() => handleAddUser({
//                 name: 'John Doe',
//                 email: 'john.doe@example.com',
//                 password: 'password123',
//                 DOB: '1990-01-01',
//                 userImage: 'path/to/image.jpg',
//                 isNewUser: true,
//                 userType: 1,
//                 friends: [],
//                 achievements: [],
//                 interests: [],
//                 events: [],
//                 requested: [],
//                 pending: []
//             })}>Add User</button>
//             <button onClick={() => handleGetUser('userId')}>Get User</button>
//             <button onClick={() => handleDeleteUser('userId')}>Delete User</button>
//             <button onClick={() => handleGetUserByEmail('john@example.com')}>Get User by Email</button>
//             {error && <p>Error: {error}</p>}
//             {user && <p>User: {JSON.stringify(user)}</p>}
//         </div>
//     );
// }

// export default MyComponent;

"use client"

import { fetchAllUsers, getUser, getUserByEmail, addNewUser, deleteUser } from '@/lib/actions/userActions';
import { fetchAllOpportunities, getOpportunity, addNewOpportunity, deleteOpportunity } from '@/lib/actions/opportunityActions';
import User from '@/lib/models/userModel';
import Opportunity from '@/lib/models/opportunityModel';

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

    const handleDeleteUser = async (userId: string) => {
        try {
            const fetchedUser = await deleteUser(userId);
            console.log("deleted", fetchedUser);
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
        email: "expert@example.com",
        userImage: "https://example.com/expert.jpg",
        password: "passwordABC",
        isNewUser: true,
        name: "expert expert",
        DOB: "2010-11-15",
        userType: 400,
        xp: 0,
        friends: [],
        achievements: [],
        interests: ["Gardening", "DIY", "Sculpture"],
        requested: [],
        pending: []
    };

    const newOpportunity: typeof Opportunity = {
        name: "crying",
        imageUrl: "https://raw.githubusercontent.com/Zaiqin/NoExpiry/main/client/src/assets/screenshot.png",
        description: "crying desc",
        availableSlots: 100,
        venue: "crying place",
        date: "2010-11-15",
        xp: 200,
    };

    const handleAddNewUser = async (user: typeof User) => {
        try {
            const createdUser = await addNewUser(user);
            console.log(createdUser);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleFetchOpportunities = async () => {
        try {
            const usersJSON = await fetchAllOpportunities();
            console.log(usersJSON)
        } catch (error) {
            console.log("An error occurred while fetching users:", error);
        }
    };

    const handleGetOpportunity = async (id: string) => {
        try {
            const fetchedOpportunity = await getOpportunity(id);
            console.log(fetchedOpportunity);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleAddNewOpportunity = async (opp: typeof Opportunity) => {
        try {
            const createdOpportunity = await addNewOpportunity(opp);
            console.log(createdOpportunity);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleDeleteOpportunity = async (id: string) => {
        try {
            const fetchedOpportunity = await deleteOpportunity(id);
            console.log("deleted", fetchedOpportunity);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <button style={{border: "1px black solid"}} onClick={handleFetchUsers}>Fetch All Users</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUser('6651e0ba94ee984b3c2436e4')}>Get User by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByEmail('john@example.com')}>Get User By Email</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddNewUser(newUser)}>Add User</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleDeleteUser('6651e0ba94ee984b3c2436e4')}>Delete User</button><br />
            <br />

            <button style={{border: "1px black solid"}} onClick={handleFetchOpportunities}>Fetch All Opportunities</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetOpportunity('6651df8aeaa03fa12bdc01e0')}>Get Opportunity by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddNewOpportunity(newOpportunity)}>Add New Opportunity</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleDeleteOpportunity('6651ee9991b2c0fb293c7d34')}>Delete Opportunity</button><br />
        </div>
    );
}

export default MyComponent;
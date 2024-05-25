"use client"

import { fetchAllUsers, getUser, getUserByEmail, addNewUser } from '@/lib/actions/user.actions';
import { fetchAllOpportunities, getOpportunity, addNewOpportunity } from '@/lib/actions/opportunity.actions';
import { User } from '@/lib/models/user.model';
import Opportunity from '@/lib/models/opportunity.model';
// import { Opportunity } from '@/lib/models/opportunityModel';

export default function MyComponent() {

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
        name: "drinking",
        description: "drinking desc",
        availableSlots: 100,
        venue: "drinking place",
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

    return (
        <div>
            <button style={{border: "1px black solid"}} onClick={handleFetchUsers}>Fetch All Users</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUser('66519ca5d021f3503872d071')}>Get User by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByEmail('john@example.com')}>Get User By Email</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddNewUser(newUser)}>Add User</button><br />
            <br />

            <button style={{border: "1px black solid"}} onClick={handleFetchOpportunities}>Fetch All Opportunities</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetOpportunity('6651df8aeaa03fa12bdc01e0')}>Get Opportunity by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddNewOpportunity(newOpportunity)}>Add New Opportunity</button><br />
        </div>
    );
}

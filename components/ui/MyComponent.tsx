"use client"

import { 
    fetchAllUsers, 
    getUser, 
    getUserByEmail, 
    addNewUser, 
    deleteUser,
    getUserFriends,
    checkName,
    addFriend,
    getUserByName,
    acceptFriendRequest,
    getUserOpportunities,
    getFriendEvents,
} from '@/lib/actions/user.actions';
import { 
    fetchAllOpportunities, 
    getOpportunity,
    addNewOpportunity, 
    deleteOpportunity 
} from '@/lib/actions/opportunity.actions';
import User from '@/lib/models/user.model';
import Opportunity from '@/lib/models/opportunity.model';

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

    const handleGetUserFriends = async (userId: string) => {
        try {
            const friends = await getUserFriends(userId);
            if (friends == null) {
                console.log("No friends")
            } else {
                console.log(friends);
            }
            
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleCheckName = async (name: string) => {
        try {
            const user = await checkName(name);
            console.log(user !== null);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleGetUserByName = async (name: string) => {
        try {
            const user = await getUserByName(name);
            console.log(user);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleAddFriend = async (requesterName: string, receiverName: string) => {
        try {
            const response = await addFriend(requesterName, receiverName);
            console.log(response.message);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleAcceptFriendRequest = async (requesterName: string, receiverName: string) => {
        try {
            const response = await acceptFriendRequest(requesterName, receiverName);
            console.log(response.message);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleGetUserEvents = async (name: string) => {
        try {
            const events = await getUserOpportunities(name);
            console.log(events);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleGetFriendEvents = async (name: string) => {
        try {
            const events = await getFriendEvents(name);
            console.log(events);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    // const newUser: typeof User = {
    //     _id: "6651f520191db42519621f9b",
    //     email: "testing@gmail.com",
    //     userImage: "https://raw.githubusercontent.com/Zaiqin/NoExpiry/main/client/src/assets/screenshot.png",
    //     password: "password",
    //     isNewUser: true,
    //     name: "testing",
    //     DOB: "2011-11-15",
    //     userType: 400,
    //     xp: 0,
    //     friends: [],
    //     achievements: [],
    //     interests: ["Gardening", "DIY", "Sculpture"],
    //     requested: [],
    //     pending: [],
    //     events: ["6651f520191db42519621f9b", "123412413413"],
    // };

    // const newOpportunity: typeof Opportunity = {
    //     name: "ggg",
    //     imageUrl: "https://raw.githubusercontent.com/Zaiqin/NoExpiry/main/client/src/assets/screenshot.png",
    //     description: "ggg desc",
    //     availableSlots: 100,
    //     venue: "ggg place",
    //     date: "2010-11-15",
    //     tags: ["Gardening", "DIY", "Sculpture"],
    //     participants: ["6651e3a081f554ce4a802128", "6651e4eaf3cb242171a6a9de"],
    //     organizerContact: ["6651e54ef3cb242171a6a9e0"],
    //     xp: 200,
    // };

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
            <button style={{border: "1px black solid"}} onClick={() => handleGetUser('6651f520191db42519621f9b')}>Get User by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByEmail('john@example.com')}>Get User By Email</button> <br />
            {/* <button style={{border: "1px black solid"}} onClick={() => handleAddNewUser(newUser)}>Add User</button><br /> */}
            <button style={{border: "1px black solid"}} onClick={() => handleDeleteUser('6651e0ba94ee984b3c2436e4')}>Delete User</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserFriends('6651e3a081f554ce4a802128')}>Get User Friends</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleCheckName('grape grape')}>Check For Name</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByName('testing')}>Get User by Name</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddFriend('1c', '1d')}>Add Friend</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleAcceptFriendRequest('1d', '1c')}>Accept Friend Request</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserEvents('testing')}>Get Events</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetFriendEvents('testing')}>Get All Friends Events</button><br />

            <br />

            <button style={{border: "1px black solid"}} onClick={handleFetchOpportunities}>Fetch All Opportunities</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetOpportunity('6651df8aeaa03fa12bdc01e0')}>Get Opportunity by ID</button> <br />
            {/* <button style={{border: "1px black solid"}} onClick={() => handleAddNewOpportunity(newOpportunity)}>Add New Opportunity</button><br /> */}
            <button style={{border: "1px black solid"}} onClick={() => handleDeleteOpportunity('6651ee9991b2c0fb293c7d34')}>Delete Opportunity</button><br />
        </div>
    );
}

export default MyComponent;
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
    registerForEvent
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
            if (friends == null || friends.length == 0) {
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

    const handleRegisterForEvent = async (name: string, eventId: string) => {
        try {
            const res = await registerForEvent(name, eventId);
            console.log(res);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const newUser: typeof User = {
        _id: "6651f520191db42519621f1e",
        email: "testing5@gmail.com",
        userImage: "https://raw.githubusercontent.com/Zaiqin/hacksingaporeassets/main/otter.jpg",
        password: "password",
        isNewUser: true,
        name: "testing5",
        DOB: "2001-11-15",
        userType: 0,
        xp: 0,
        friends: [],
        achievements: [],
        interests: ["Gardening", "DIY", "Sculpture"],
        requested: [],
        pending: [],
        events: [],
    };

    const newOpportunity: typeof Opportunity = {
        name: "Send Off",
        imageUrl: "https://raw.githubusercontent.com/Zaiqin/hacksingaporeassets/main/walk.png",
        description: "Send People Off to flights",
        availableSlots: 100,
        venue: "Changi Airport",
        date: "2010-11-15",
        tags: ["Money"],
        participants: [],
        organizerContact: [],
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
            <button style={{border: "1px black solid"}} onClick={() => handleGetUser('6651f520191db42519621f9b')}>Get User by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByEmail('testing@gmail.com')}>Get User By Email</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddNewUser(newUser)}>Add User</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleDeleteUser('6651f520191db42519621f9e')}>Delete User</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserFriends('testing')}>Get User Friends</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleCheckName('grape grape')}>Check For Name</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserByName('testing')}>Get User by Name</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddFriend('testing3', 'testing2')}>Add Friend</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleAcceptFriendRequest('', 'testing1')}>Accept Friend Request</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetUserEvents('testing')}>Get Events</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetFriendEvents('testing')}>Get All Friends Events</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleRegisterForEvent('testing5', "66523f3b2ec4e8e963175f8f")}>Register for Event</button><br />

            <br />

            <button style={{border: "1px black solid"}} onClick={handleFetchOpportunities}>Fetch All Opportunities</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleGetOpportunity('6651f520191db42519621f9b')}>Get Opportunity by ID</button> <br />
            <button style={{border: "1px black solid"}} onClick={() => handleAddNewOpportunity(newOpportunity)}>Add New Opportunity</button><br />
            <button style={{border: "1px black solid"}} onClick={() => handleDeleteOpportunity("66523e4e2ec4e8e963175f7e")}>Delete Opportunity</button><br />
        </div>
    );
}

export default MyComponent;
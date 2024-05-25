"use server"

import { connectToDB } from '@/lib/mongoose';
import User from '@/lib/models/user.model';
import Opportunity from '@/lib/models/opportunity.model';
import mongoose from 'mongoose';

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

export async function getUserFriends(name: string) {
    try {
        await connectToDB();

        // Find the user
        const user = await getUserByName(name);
        if (!user) {
            throw new Error('User not found');
        }

        // Extract friend IDs from the user's friends array
        const friendIds = user.friends;

        // Find users with friend IDs
        const friends = await User.find({ _id: { $in: friendIds } });

        // Return friends as plain objects
        if (!friends || friends == null) {
            return [];
        }
        return friends.map(friend => friend.toObject());
    } catch (err: any) {
        throw new Error(`Failed to fetch user friends: ${err.message}`);
    }
}

export async function getUserOpportunities(name: string) {
    try {
        await connectToDB();
        
        // Find the user by ID
        const user = await getUserByName(name);
        if (!user) {
            throw new Error('User not found');
        }

        // Extract friend IDs from the user's friends array
        const eventsIDs = user.events;

        // Find users with friend IDs
        const events = await Opportunity.find({ _id: { $in: eventsIDs } });

        // Return friends as plain objects
        return events.map(event => event.toObject());
    } catch (err: any) {
        throw new Error(`Failed to fetch user friends: ${err.message}`);
    }
}

export async function getFriendEvents(name: string) {
    try {
        // Find the user
        const user = await getUserByName(name);
        if (!user) {
            throw new Error('User not found');
        }

        // Extract friend IDs from the user's friends array
        const friendIds = user.friends;

        // Find events for each friend
        const friendEvents = [];
        for (const friendId of friendIds) {
            // Find user by ID
            const friend = await User.findById(friendId);
            if (!friend) {
                throw new Error('Friend not found');
            }

            // Extract event IDs from the friend's events array
            const eventIds = friend.events;

            // Find events with event IDs
            const events = await Opportunity.find({ _id: { $in: eventIds } });

            // Push events to the friendEvents array
            friendEvents.push({
                friendId: friend._id,
                friendName: friend.name,
                events: events.map(event => event.toObject())
            });
        }

        return friendEvents;
    } catch (err: any) {
        throw new Error(`Failed to fetch user friends' events: ${err.message}`);
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


export async function getUserByName(name: string) {
    try {
        await connectToDB();
        
        // Find the user by name
        const user = await User.findOne({ name });
        return user ? user.toObject() : null;
    } catch (err: any) {
        throw new Error(`Failed to check user name: ${err.message}`);
    }
}

export async function addFriend(requesterName: string, receiverName: string) {
    try {
        await connectToDB();

        const [requesterUser, receiverUser] = await Promise.all([
            getUserByName(requesterName),
            getUserByName(receiverName)
        ]);

        if (!requesterUser || !receiverUser) {
            throw new Error('User(s) not found');
        }

        const requesterUserId = requesterUser._id;
        const receiverUserId = receiverUser._id;

        console.log('Requester User ID:', requesterUserId);
        console.log('Receiver User ID:', receiverUserId);

        // Add receiver's user ID to requester's pending array
        const updatedRequester = await User.findByIdAndUpdate(
            requesterUserId,
            { $push: { pending: receiverUserId } },
            { new: true, useFindAndModify: false }
        );

        // Add requester's user ID to receiver's requested array
        const updatedReceiver = await User.findByIdAndUpdate(
            receiverUserId,
            { $push: { requested: requesterUserId } },
            { new: true, useFindAndModify: false }
        );

        if (!updatedRequester || !updatedReceiver) {
            throw new Error('Failed to update user records');
        }

        return { message: 'Friend request sent successfully' };
    } catch (err: any) {
        throw new Error(`Failed to send friend request: ${err.message}`);
    }
}
  
export async function acceptFriendRequest(requesterName: string, receiverName: string) { 
    try {
      await connectToDB();
  
      const [requesterUser, receiverUser] = await Promise.all([
        getUserByName(requesterName),
        getUserByName(receiverName),
      ]);
  
      if (!requesterUser || !receiverUser) {
        throw new Error('User(s) not found');
      }
  
      const requesterUserId = requesterUser._id; 
      const receiverUserId = receiverUser._id; 
  
      console.log('Requester User ID:', requesterUserId);
      console.log('Receiver User ID:', receiverUserId);
  
      // Start a session and transaction for atomicity
      const session = await User.startSession();
      session.startTransaction();
  
      try {
        // // Move receiver's user ID to requester's friends array
        await User.findByIdAndUpdate(
          requesterUserId,
          { $push: { friends: receiverUserId } },
          { new: true, useFindAndModify: false, session }
        );
  
          // Move requester's user ID to receiver's friends array
          await User.findByIdAndUpdate(
              receiverUserId,
              { $push: { friends: requesterUserId } },
              { new: true, useFindAndModify: false, session }
          );

          // Remove requester's user ID from receiver's pending array
          await User.findByIdAndUpdate(
            requesterUserId,
              { $pull: { requested: receiverUserId._id } },
              { new: true, useFindAndModify: false, session }
          );

          // Remove receiver's user ID from requester's requested array
          await User.findByIdAndUpdate(
            receiverUserId,
              { $pull: { pending: requesterUser._id } },
              { new: true, useFindAndModify: false, session }
          );

          // Commit the transaction
          await session.commitTransaction();
          session.endSession();

        return { message: 'Friend request accepted successfully' };
      } catch (err) {
        // Abort the transaction if any error occurs
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    } catch (err: any) {
      throw new Error(`Failed to accept friend request: ${err.message}`);
    }
  }

  export async function registerForEvent(username: string, eventId: string) {
    try {
        await connectToDB();

        // Find the user by username
        const user = await getUserByName(username);
        if (!user) {
            throw new Error('User not found');
        }
        console.log('user is', user);

        // Start a session and transaction for atomicity
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Add the user's ID to the event's participants list
            await Opportunity.findByIdAndUpdate(
                eventId,
                { $push: { participants: user._id } }, // Use $addToSet to prevent duplicate entries
                { new: true, useFindAndModify: false, session }
            );

            // Add the event ID to the user's events list
            await User.findByIdAndUpdate(
                user._id,
                { $push: { events: eventId } }, // Use $addToSet to prevent duplicate entries
                { new: true, useFindAndModify: false, session }
            );

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return { message: 'Registered successfully' };
        } catch (err) {
            // Abort the transaction if any error occurs
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    } catch (err: any) {
        throw new Error(`Failed to register: ${err.message}`);
    }
}
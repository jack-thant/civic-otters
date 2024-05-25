import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensures that each email is unique
    },
    userImage: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isNewUser: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Referencing the User model
    }],
    achievements: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Badge' // Referencing the Badge model
    }],
    interests: [{ 
        type: String,
    }],
    events: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Opportunity' // Referencing the Opportunity model
    }],
    requested: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' // Referencing the User model
    }],
    pending: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' // Referencing the User model
    }]
});

export const User = mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const { Schema } = mongoose;

export const opportunitySchema = new Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    name: { 
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    availableSlots: {
        type: Number,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: true 
    },
    tags: [{ 
        type: String,
    }],
    participants: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' // Referencing the User model
    }],
    organizerContact: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' // Referencing the User model
    }],
    xp: {
        type: Number,
        required: true
    },
});

export const Opportunity = mongoose.model('Opportunity', opportunitySchema);
import mongoose from 'mongoose';

const { Schema } = mongoose;

export const opportunitySchema = new Schema({
    name: { 
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
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

const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;
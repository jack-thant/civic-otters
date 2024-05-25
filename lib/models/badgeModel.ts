import mongoose from 'mongoose';

const { Schema } = mongoose;

export const badgeSchema = new Schema({
    badgeId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rewardValue: {
        type: Number,
        required: true
    }
});

export const Badge = mongoose.model('Badge', badgeSchema);
"use server"

import { connectToDB } from '@/lib/mongoose';
import Opportunity from '@/lib/models/opportunityModel';
// import mongoose from 'mongoose';

export async function fetchAllOpportunities() {
    try {
        await connectToDB();
        const opps = await Opportunity.find();
        return opps.map(opp => opp.toObject()); // Convert Mongoose documents to plain objects
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

export async function getOpportunity(id: string) {
    try {
        await connectToDB();
        const opp = await Opportunity.findById(id);
        return opp ? opp.toObject() : null;
    } catch (err: any) {
        throw new Error(`Failed to fetch user: ${err.message}`);
    }
}

export async function addNewOpportunity(
    oppData: typeof Opportunity
) {
    try {
        await connectToDB();

        console.log(oppData)

        const newOpportunity = new Opportunity(oppData);
        const savedOpportunity = await newOpportunity.save();
        return savedOpportunity ? savedOpportunity.toObject() : null;
    } catch (err: any) {
        throw new Error(`Failed to add new user: ${err.message}`);
    }
};

// export async function addNewOpportunity(oppData: typeof Opportunity) {
//     try {
//         await connectToDB();

//         // Generate a unique ObjectId for the opportunity
//         console.log(oppData)
//         oppData._id = new mongoose.Types.ObjectId();

//         const newOpportunity = new Opportunity(oppData);
//         const savedOpportunity = await newOpportunity.save();
//         return savedOpportunity ? savedOpportunity.toObject() : null;
//     } catch (err: any) {
//         throw new Error(`Failed to add new opportunity: ${err.message}`);
//     }
// }
import mongoose from "mongoose";

const studentInfoSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        lastOnlineTimeSeconds: {
            type: Date
        },
        currentRating: {
            type: Number
        },
        maxRating: {
            type: Number
        },
        handle: {
            type: String,
            required: true,
            unique: true
        },
        rank: {
            type: String
        },
        maxRank: { type: String },
        titlePhoto: { type: String },
        avatar: { type: String }
    }
)

export const studentInfoModel = mongoose.model("Students", studentInfoSchema)
import mongoose from "mongoose";

const contestRatingHistorySchema = new mongoose.Schema(
    {
        contestId: {
            type: String,
            required: true,
        },
        contestName: {
            type: String,
            required: true,
        },
        handle: {
            type: String,
            required: true,
            ref: "Student",
        },
        oldRating: {
            type: Number,
            required: true,
        },
        newRating: {
            type: Number,
            required: true,
        },
        rank: {
            type: Number,
        },
        contestTimestamp: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

export const contestRatingHistoryModel = mongoose.model(
    "ContestRatingHistory",
    contestRatingHistorySchema
);

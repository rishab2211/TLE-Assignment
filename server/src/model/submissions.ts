import mongoose from "mongoose";

// Define subdocuments first
const problemSchema = new mongoose.Schema({
  contestId: Number,
  index: String,
  name: String,
  type: String,
  points: Number,
  rating: Number,
  tags: [String],
}, { _id: false });

const memberSchema = new mongoose.Schema({
  handle: String
}, { _id: false });

const authorSchema = new mongoose.Schema({
  contestId: Number,
  participantId: Number,
  members: [memberSchema],
  participantType: String,
  ghost: Boolean,
  room: Number,
  startTimeSeconds: Number,
}, { _id: false });

const submissionSchema = new mongoose.Schema({
  submissionId: { type: Number, required: true, unique: true },
  handle: { type: String, required: true },
  contestId: { type: Number, required: true },
  creationTimeSeconds: { type: Number, required: true },
  relativeTimeSeconds: Number,
  problem: problemSchema,
  author: authorSchema,
  programmingLanguage: String,
  verdict: String,
  testset: String,
  passedTestCount: Number,
  timeConsumedMillis: Number,
  memoryConsumedBytes: Number,
}, {
  timestamps: true
});

export const submissionHistoryModel = mongoose.model("Submission", submissionSchema);
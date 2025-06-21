export type StudentDetails = {
  _id: string;
  firstName: string;
  lastName: string;
  lastOnlineTimeSeconds: string;
  currentRating: number;
  maxRating: number;
  handle: string;
  rank: string;
  maxRank: string;
  titlePhoto: string;
  avatar: string;
  __v: number;
};

export type RatingPoint = {
  timestamp: string; // ISO date
  oldRating: number;
  newRating: number;
};

export type ContestEntry = {
  contestName: string;
  date: string;
  rank: number | string;
  ratingChange: number;
  problemsAttempted: number;
  problemsUnsolved: number;
};

export type ContestHistoryResponse = {
  handle: string;
  days: number;
  ratingGraph: RatingPoint[];
  contestList: ContestEntry[];
};

export interface TopCompanies {
  leaderboard: LeaderBoard[];
}

export interface LeaderBoard {
  canonical_name: string;
  count: number;
}

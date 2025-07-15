export interface LeagueFilter {
  sport: string | null;
  search: string;
}

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface LeagueResponse {
  leagues: League[];
}

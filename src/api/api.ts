import { League, LeagueResponse } from "@/types/League";
import { SeasonsResponse } from "@/types/Seasons";

const API_BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

let leaguesCache: League[] = [];
export function getLeagues(): Promise<League[]> {
  if (leaguesCache.length > 0) {
    return Promise.resolve(leaguesCache);
  }

  return fetch(`${API_BASE_URL}/all_leagues.php`)
    .then((response) => response.json())
    .then((data: LeagueResponse) => {
      leaguesCache = data.leagues || [];
      return data.leagues;
    })
    .catch((error) => {
      console.error("Error fetching leagues:", error);
      throw error;
    });
}

const badgeCache: Map<string, string> = new Map<string, string>();
export function getSeasonBadgeImage(leagueId: string): Promise<string> {
  if (badgeCache.has(leagueId)) {
    return Promise.resolve(badgeCache.get(leagueId));
  }

  return fetch(`${API_BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`)
    .then((response) => response.json())
    .then((data: SeasonsResponse) => {
      if (!data.seasons || data.seasons.length === 0) {
        throw new Error("No seasons found for the given league ID");
      }

      // Get the last season's badge URL
      const badgeUrl = data.seasons[data.seasons.length - 1]?.strBadge;
      if (badgeUrl) {
        badgeCache.set(leagueId, badgeUrl);
      } else {
        throw new Error("Badge URL not found for the given league ID");
      }
      return badgeUrl;
    })
    .catch((error) => {
      console.error("Error fetching game badge:", error);
      throw error;
    });
}

export function tryGetBadgeImageFromCache(leagueId: string): string | null {
  return badgeCache.get(leagueId) || null;
}

const APP_ID = "umg_bigmachinelabelgroup_marfa";
const ARTIST_ID = "15554971";
const CAME_FROM = "267";
const AFFIL_CODE = "umg_us";

const BASE_PARAMS = new URLSearchParams({
  app_id: APP_ID,
  came_from: CAME_FROM,
  utm_medium: "api",
  utm_source: "public_api",
  affil_code: AFFIL_CODE,
});

export interface BandsintownVenue {
  name: string;
  city: string;
  region: string;
  country: string;
  location: string;
}

export interface BandsintownOffer {
  status: string;
  type: string;
  url: string;
}

export interface BandsintownEvent {
  id: string;
  datetime: string;
  venue: BandsintownVenue;
  lineup: string[];
  offers: BandsintownOffer[];
  free: boolean;
  title: string;
}

export function getTicketUrl(eventId: string): string {
  return `https://www.bandsintown.com/t/${eventId}?${BASE_PARAMS}&utm_campaign=ticket`;
}

export function getEventUrl(eventId: string): string {
  return `https://www.bandsintown.com/e/${eventId}?${BASE_PARAMS}&utm_campaign=event`;
}

export function getRsvpUrl(eventId: string): string {
  return `${getEventUrl(eventId)}&trigger=rsvp_going`;
}

export const FOLLOW_URL = `https://www.bandsintown.com/a/${ARTIST_ID}?came_from=${CAME_FROM}&app_id=${APP_ID}&trigger=track&affil_code=${AFFIL_CODE}`;

export const PLAY_MY_CITY_URL = `https://www.bandsintown.com/a/${ARTIST_ID}?came_from=${CAME_FROM}&app_id=${APP_ID}&trigger=play_my_city&affil_code=${AFFIL_CODE}`;

export async function getUpcomingEvents(): Promise<BandsintownEvent[]> {
  const res = await fetch(
    `https://rest.bandsintown.com/artists/id_${ARTIST_ID}/events?app_id=${APP_ID}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const data: BandsintownEvent[] = await res.json();
  return data;
}

export function formatEventDate(datetime: string): string {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = String(date.getFullYear()).slice(2);
  return `${day} ${month} ${year}`;
}

export function formatCityRegion(venue: BandsintownVenue): string {
  if (venue.region) {
    return `${venue.city}, ${venue.region}`;
  }
  return `${venue.city}, ${venue.country}`;
}

export function getSupport(event: BandsintownEvent): string[] {
  return event.lineup.filter(
    (name) => name.toLowerCase() !== "marfa"
  );
}

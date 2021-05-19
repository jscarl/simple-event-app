export interface IEventState {
  readonly events: IEventModel[];
  readonly event: IEventModel;
  readonly trackedEvents: IEventModel[];
  readonly isLoading: boolean;
  readonly errorMessage: string;
}

export type ApiResponse = Record<string, any>;

// export interface IEventModel extends ApiResponse {
//   results: Result[];
// }

export interface IEventModel extends ApiResponse {
  id: number;
  displayName: string;
  type: string;
  uri: string;
  status: string;
  popularity: number;
  start?: Start;
  entryPrice: number;
  flaggedAsEnded: boolean;
  venue?: Venue;
  location?: Location;
}

//#region
interface Location {
  city: string;
  lat: number;
  lng: number;
}

interface Start {
  date: Date;
  datetime: string;
  time: string;
}

interface Venue {
  id: number;
  displayName: string;
  uri: string;
  metroArea: MetroArea;
  lat: number;
  lng: number;
}

interface MetroArea {
  displayName: string;
  country: Country;
  id: number;
  uri: string;
}

interface Country {
  displayName: string;
}

//#endregion

export const EventActionTypes = {
  FETCH_EVENT_REQUEST: '@@/event/FETCH_EVENT_REQUEST',
  FETCH_EVENT_SUCCESS: '@@/event/FETCH_EVENT_SUCCESS',
  FETCH_EVENT_FAILED: '@@/event/FETCH_EVENT_FAILED',

  ADD_TRACKING_EVENT: '@@/event/ADD_TRACKING_EVENT',
  REMOVE_TRACKING_EVENT: '@@/event/REMOVE_TRACKING_EVENT',
};

import {EventActionTypes, IEventState} from './event_types';

const initialState: IEventState = {
  events: [],
  event: {
    id: 0,
    displayName: '',
    type: '',
    uri: '',
    status: '',
    popularity: 0,
    entryPrice: 0,
    flaggedAsEnded: false,
  },
  trackedEvents: [],
  isLoading: false,
  errorMessage: '',
};

interface IAction {
  type: string;
  payload: any;
}

export const eventReducer = (
  state: IEventState = initialState,
  action: IAction,
): IEventState => {
  switch (action.type) {
    case EventActionTypes.FETCH_EVENT_REQUEST:
      return {...state, isLoading: true};
    case EventActionTypes.FETCH_EVENT_SUCCESS:
      return {...state, isLoading: false, events: action.payload};
    case EventActionTypes.FETCH_EVENT_FAILED:
      return {...state, isLoading: false, errorMessage: action.payload};
    case EventActionTypes.ADD_TRACKING_EVENT:
      return {
        ...state,
        isLoading: false,
        trackedEvents: [...state.trackedEvents, action.payload],
      };
    case EventActionTypes.REMOVE_TRACKING_EVENT:
      return {
        ...state,
        isLoading: false,
        trackedEvents: state.trackedEvents.filter(e => e.id !== action.payload),
      };
    default:
      return state;
  }
};

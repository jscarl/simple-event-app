import {Action} from 'redux';
import {EventActionTypes} from './event_types';

export interface IEventAction extends Action {
  readonly payload?: any;
}

export const fetchEvents = (): IEventAction => ({
  type: EventActionTypes.FETCH_EVENT_REQUEST,
});

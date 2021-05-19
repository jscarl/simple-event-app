import {api} from '../utils/api_config';
import {IEventModel} from './event_types';

export async function getEvents() {
  return await api.get<IEventModel[]>('results');
}

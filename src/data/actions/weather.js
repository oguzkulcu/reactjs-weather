import {store} from '../../store';

export function setCities(cities) {
    store.dispatch({
        type: 'SET_CITIES',
        payload: {
            cities
        }
    });
}

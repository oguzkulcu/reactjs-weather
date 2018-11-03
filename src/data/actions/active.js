import {store} from '../../store';

export function setActive(link) {
    store.dispatch({
        type: 'SET_ACTIVE',
        payload: {
            link
        }
    });
}

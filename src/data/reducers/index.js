import weather from './weather';
import active from './active';

import {combineReducers} from 'redux';

const reducersCombined = combineReducers({
    weather,
    active
});

export default reducersCombined;

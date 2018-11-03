import {createStore} from "redux";

import reducersCombined from './data/reducers';

export const store = createStore(reducersCombined);
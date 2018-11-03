let initialState = {
    cities: {}
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITIES':
            return Object.assign({}, state, {cities: action.payload.cities});
        default:
            return state;
    }
}

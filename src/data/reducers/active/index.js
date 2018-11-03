let initialState = {
    link: 'home'
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVE':
            return Object.assign({}, state, {link: action.payload.link});
        default:
            return state;
    }
}

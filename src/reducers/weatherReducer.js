
const initialState = {
    cityKey: '',
    error: '',
    darkMod:false,
    degree:'℃',
}

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                cityKey: action.cityKey
            }
        case 'SET_DARKMOD':
            return {
                ...state,
                darkMod: action.isDark
            }
        case 'SET_DEGREE':
            return {
                ...state,
                degree: action.degree
            }
        case 'ERROR':
            return {
                ...state,
                error: action.msg
            }
        default:
            return state;
    }
}
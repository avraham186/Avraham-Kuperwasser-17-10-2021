
const initialState = {
    cityKey: '',
    favoritCities: [],
    currentForecast:'',
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
        case 'SET_CURRENT_FORECAST':
            return {
                ...state,
                currentForecast:  action.currentForecast
            }
        case 'ADD_CITY':
            return {
                ...state,
                favoritCities: [...state.favoritCities, action.cityToSave]
            }
        case 'REMOVE_CITY':
            return {
                ...state,
                favoritCities: state.favoritCities.filter(cityToRemove => {
                    return cityToRemove._id !== action.cityId
                })
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
import { weatherService } from "../services/weatherService";

export function setCity(cityKey) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_CITY', cityKey })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}
export function setIsDarkMod(isDark) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_DARKMOD', isDark })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}
export function setDegree(degree) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_DEGREE', degree })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}
export function addCity(cityKey) {
    return async dispatch => {
        try {
            const cityCurrentCondition = await weatherService.getCityCurrentCondition(cityKey)
            const city = await weatherService.searchCityByCityKey(cityKey)
            const cityToSave = await weatherService.save(city,cityCurrentCondition)
                dispatch({ type: 'ADD_CITY', cityToSave })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}
export function removeCity(cityId) {
    return dispatch => {
        try {
            dispatch({ type: 'REMOVE_CITY', cityId })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}
export function errorMsg(msg) {
    return dispatch => {
        try {
            dispatch({ type: 'ERROR', msg })
        } catch (err) {
            console.log('there was an error', err);
        }
    }
}
import { storageService } from './storageService.js'

export const weatherService = {
    save,
    remove,
    loadCities,
    searchCityByCityKey,
    searchCityAutoComplete,
    getCityCurrentCondition,
    get5DayForeCast,
    getLatLanCoor
}

const STORAGE_KEY = 'cities'
const API_KEY = 'BmFV9KHIUx2TcW2wwfyb8GWT1lOc5i2L'
const BASE_URL = 'http://dataservice.accuweather.com'
const gCitys = []

async function save(cityKey, cityName) {
    try {
        const cityCurrentCondition = await weatherService.getCityCurrentCondition(cityKey)
        const cityToSave = {
            _id: _makeId(),
            name: cityName,
            cityCurrentCondition,
            cityKey
        }
        gCitys.push(cityToSave)
        storageService.saveToStorage(STORAGE_KEY, gCitys)
        return Promise.resolve(cityToSave);
    } catch (err) {
        const msg = err
        return Promise.reject(msg)
    }
}
function remove(cityId) {
    try {
        const idx = gCitys.findIndex(city => city._id === cityId)
        gCitys.splice(idx, 1)
        storageService.saveToStorage(STORAGE_KEY, gCitys)
        return Promise.resolve();
    } catch (err) {
        const msg = err
        throw new Error(msg)
    }
}
function loadCities() {
    try {
        const cities = storageService.loadFromStorage(STORAGE_KEY)||[]
        return cities;
    } catch (err) {
        const msg = err
        throw new Error(msg)
    }
}
async function searchCityAutoComplete(searchTerm) {
    try {
        let response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const cities = await response.json()
        return cities
    } catch (err) {
        const msg = (err.message);
        Promise.reject(msg)
    }
}
async function searchCityByCityKey(cityKey) {
    try {
        let response = await fetch(`${BASE_URL}/locations/v1/${cityKey}?apikey=${API_KEY}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const city = await response.json()
        return city
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg)
    }
}

async function getCityCurrentCondition(cityKey) {
    try {
        let response = await fetch(`${BASE_URL}/currentconditions/v1/${cityKey}?apikey=${API_KEY}&details=false`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const correntCondition = await response.json()
        return correntCondition
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }
}

async function get5DayForeCast(cityKey, isC) {
    const metric = () => {
        return isC === '℃' ? true : false
    }
    try {
        let response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=${metric()}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const forecast5day = await response.json()
        return forecast5day
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }
}

async function getLatLanCoor(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const city = await response.json()
        return city
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }

}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
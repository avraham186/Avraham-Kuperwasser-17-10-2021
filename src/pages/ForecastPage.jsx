import React, { useEffect, useState } from 'react'
import { addCity, errorMsg, setCity, removeCity } from '../actions/weatherActions';
import { useDispatch, useSelector } from 'react-redux'
import { weatherService } from '../services/weatherService';
import { CitySearch } from '../cmps/CitySearch';
import { WeatherList } from '../cmps/WeatherList'
import { MsgModal } from '../cmps/MsgModal'

export const ForecastPage = () => {
    const { favoritCities, cityKey, darkMod, degree, error } = useSelector(state => state.weatherModule)
    const [forecast, setForecast] = useState('')
    const [currentForecast, setCurrentForecast] = useState('')
    const [cityName, setcityName] = useState('')
    const dispatch = useDispatch()
    let cityId

    useEffect(() => {
        if (cityKey === '') {
            navigator.geolocation.getCurrentPosition(success, navigatorError)
        } else {
            onGetCityForecast(cityKey)
        }
    }, [])

    const success = async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const city = await weatherService.getLatLanCoor(lat, lon)
        setcityName(city.LocalizedName)
        dispatch(setCity(city.cityKey))
        await onGetCityForecast(city.Key)
    }
    const navigatorError = () => {
        dispatch(setCity('215854'))
        dispatch(errorMsg('there was an error to get location'))
        console.log('there was an error to get location')
    }
    const isDarkMode = () => {
        return darkMod ? 'dark' : ''
    }
    const onSearch = async (searchTerm) => {
        return await weatherService.searchCityAutoComplete(searchTerm)
    }
    const onGetCityForecast = async (cityKey) => {
        dispatch(setCity(cityKey))
        const forecast5Day = await weatherService.get5DayForeCast(cityKey, degree)
        const currentForecast = await weatherService.getCityCurrentCondition(cityKey)
        const city = await weatherService.searchCityByCityKey(cityKey)
        setCurrentForecast(currentForecast[0])
        setForecast(forecast5Day.DailyForecasts)
        setcityName(city.LocalizedName)
    }
    const getTemp = () => {
        if (degree === '℃') {
            return currentForecast.Temperature.Metric.Value
        } else {
            return currentForecast.Temperature.Imperial.Value
        }
    }
    const onAddToFavorits = () => {
        dispatch(addCity(cityKey))
        dispatch(errorMsg('city added to favorits'))
    }
    const onDeleteCity = () => {
        dispatch(removeCity(cityId))
        dispatch(errorMsg('city removed'))
    }
    const isFavorit = () => {
        return favoritCities.some(city => {
            cityId = city._id
            return city.cityKey === cityKey
        })
    }
    const onCloseModal = () => {
        dispatch(errorMsg(''))
    }

    return (
        <section className="main-layout">
            <div className={`forecast-page ${isDarkMode()} flex column justify-center align-center`}>

                <CitySearch onSearch={onSearch} onGetCityForecast={onGetCityForecast} />
                {cityName && <h1>{cityName}</h1>}
                {currentForecast && <span>{currentForecast.WeatherText}</span>}
                {forecast && <span className="current-temp">{getTemp()}{degree}</span>}
                {forecast && <WeatherList forecast={forecast}
                    isDarkMode={isDarkMode} degree={degree} darkMod={darkMod} />}
                {isFavorit() ? <button className="btn-remove-from-favorit"
                    onClick={onDeleteCity}>delete city from favorits</button>
                    : <button className="btn-add-to-favorit"
                        onClick={() => onAddToFavorits()}>add to favorit cities</button>}
            </div>
            {error && <MsgModal msg={error} onCloseModal={onCloseModal} />}
        </section>
    )
}
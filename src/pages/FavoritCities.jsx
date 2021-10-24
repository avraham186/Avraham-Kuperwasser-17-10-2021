import React, { useEffect, useState } from 'react'
import { weatherService } from '../services/weatherService'
import { setCity, errorMsg } from '../actions/weatherActions'
import { useDispatch, useSelector } from 'react-redux'
import { FavoritList } from '../cmps/FavoritList'
import { MsgModal } from '../cmps/MsgModal'

export const FavoritCities = () => {
    const { darkMod, degree, error } = useSelector(state => state.weatherModule)
    const [favoritCities, setFavoritCities] = useState('')
    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            const cities = await weatherService.loadCities()
            setFavoritCities(cities)
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }, [error])

    const isDarkMode = () => {
        return darkMod ? 'dark' : ''
    }
    const onDeleteCity = (cityId => {
        try {
            weatherService.remove(cityId)
            const cities = weatherService.loadCities()
            setFavoritCities(cities)
            dispatch(errorMsg('city removed'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    })
    const onSetCity = (cityKey) => {
        try {
            dispatch(setCity(cityKey))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const onCloseModal = () => {
        dispatch(errorMsg(''))
    }
    return (
        <div>
            <section className='main-layout'>
                <div className={`favorit-page ${isDarkMode()} flex column`}>
                    {favoritCities &&
                        <FavoritList
                            favoritCities={favoritCities}
                            onDeleteCity={onDeleteCity}
                            onSetCity={onSetCity}
                            isDarkMode={isDarkMode}
                            degree={degree}
                            darkMod={darkMod}
                        />}
                </div>
                {error && <MsgModal msg={error} onCloseModal={onCloseModal} />}
            </section>
        </div>
    )
}
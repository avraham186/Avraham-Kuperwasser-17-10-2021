import React from 'react'
import { setCity, removeCity, errorMsg } from '../actions/weatherActions'
import { useDispatch, useSelector } from 'react-redux'
import { FavoritList } from '../cmps/FavoritList'
import { MsgModal } from '../cmps/MsgModal'

export const FavoritCities = () => {
    const { favoritCities, darkMod, degree, error } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    const isDarkMode = () => {
        return darkMod ? 'dark' : ''
    }
    const onDeleteCity = (cityId => {
        dispatch(removeCity(cityId))
        dispatch(errorMsg('city removed'))
    })
    const onSetCity = (cityKey) => {
        dispatch(setCity(cityKey))
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function FavoritPreview({ favoritCity, onDeleteCity, onSetCity, isDarkMode, degree, darkMod }) {

    const [temp, setTemp] = useState('')
    const [unit, setUnit] = useState('')

    useEffect(() => {
        setTemp(getTemp())
        setUnit(getUnit())
    }, [degree])

    const previewClicked = () => {
        onSetCity(favoritCity.cityKey)
    }
    const removeCity = (ev) => {
        ev.preventDefault()
        onDeleteCity(favoritCity._id)
    }
    const getTemp = () => {
        if (degree === '℃') {
            return favoritCity.cityCurrentCondition[0].Temperature.Metric.Value
        } else {
            return favoritCity.cityCurrentCondition[0].Temperature.Imperial.Value
        }
    }
    const getUnit = () => {
        return degree === '℃' ? favoritCity.cityCurrentCondition[0].Temperature.Metric.Unit :
            favoritCity.cityCurrentCondition[0].Temperature.Imperial.Unit
    }
    return (
        <div className={`favorit-preview ${isDarkMode()} flex column align-center justify-center`} onClick={previewClicked}>
            <Link to="/" className="favorit-preview-link">
                <h1 className={`favorit-preview-h1 ${isDarkMode()}`}>{favoritCity.name}</h1>
                <div className="favorit-preview-content flex column justify-center align-center">
                    <span className={`favorit-preview-span ${isDarkMode()}`}>
                        {temp && <span>{temp}</span>}{temp && <span>{unit}</span>}
                    </span>
                    <span className={`favorit-preview-span ${isDarkMode()}`}>
                        {favoritCity.cityCurrentCondition[0].WeatherText}
                    </span>
                    <button className="delete-btn" onClick={(ev) => removeCity(ev)}>remove city</button>
                </div>
            </Link>
        </div>
    )
}
import { Card } from '@material-ui/core'
import React from 'react'
import { WeatherPreview } from './WeatherPreview.jsx'

export const WeatherList = ({ forecast, degree, isDarkMode }) => {

    return (
        <div className='wheather-list flex jastify-center align-center'>
            {forecast.map(day => {
                return <Card key={day.EpochDate} variant="outlined" className="weather-preview-card">
                    <WeatherPreview day={day} degree={degree} isDarkMode={isDarkMode} /></Card>
            })}
        </div>
    )
}
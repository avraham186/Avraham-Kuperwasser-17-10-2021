import React from 'react'

export function WeatherPreview({ day,degree,isDarkMode }) {

    const getTemp = (min, max) => {
        const avgTemp = '' + (min + max) / 2
        return avgTemp.substr(0, 4)
    }
    
    const getDate = () => {
        const year = day.Date.substr(0, 4)
        const month = day.Date.substr(5, 2)
        const dateDey = day.Date.substr(8, 2)
        const date = `${dateDey}-${month}-${year}`
        return date
    }

    return (
        <div className={`weather-preview ${isDarkMode()} flex column align-center justify-center`}>
            <span>{getDate()}</span>
            <br />
            <div>
                <span>
                    {getTemp(day.Temperature.Minimum.Value, day.Temperature.Maximum.Value)}</span>
                <span>{degree}</span>
            </div>
            <div>Day will be{day.Day.IconPhrase}</div>
            <div>Night will be{day.Night.IconPhrase}</div>
        </div>
    )
}
import React from 'react'

export function WeatherPreview({ day, degree, isDarkMode }) {

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
            <div className="flex column align-center justify-center">
                {day.Day.IconPhrase}
                <img src={process.env.PUBLIC_URL + `/images/${day.Day.Icon}.png`} alt="day icon" />
            </div>
            <div className="flex column align-center justify-center">
                {day.Night.IconPhrase}
                <img src={process.env.PUBLIC_URL + `/images/${day.Night.Icon}.png`} alt="night icon" />
            </div>
        </div>
    )
}
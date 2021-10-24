import React from 'react'
import { Card } from '@material-ui/core'
import { FavoritPreview } from './FavoritPreview.jsx'

export const FavoritList = ({ favoritCities, onDeleteCity, onSetCity, isDarkMode, degree, darkMod }) => {
    if (!favoritCities || favoritCities.length === 0) return <div>There is no favorit cities</div>
    return (
        <div className='favorit-list flex align-center justify-center'>
            {favoritCities.map(favoritCity => {
                return <Card key={favoritCity._id} variant="outlined">
                    < FavoritPreview favoritCity={favoritCity}
                        onDeleteCity={onDeleteCity} onSetCity={onSetCity}
                        isDarkMode={isDarkMode} degree={degree} darkMod={darkMod} />
                </Card>
            }
            )}
        </div>
    )
}

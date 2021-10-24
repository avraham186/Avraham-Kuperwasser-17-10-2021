import './assets/main.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { ForecastPage } from './pages/ForecastPage'
import { FavoritCities } from './pages/FavoritCities'
import { AppFooter } from './cmps/AppFooter'
export const App = () => {
  return (
    <div className="weather-app">
      <AppHeader />
      <Switch>
        <Route path="/favoritCities" component={FavoritCities} />
        <Route path="/" component={ForecastPage} />
      </Switch>
      <AppFooter />
    </div>
  );
}
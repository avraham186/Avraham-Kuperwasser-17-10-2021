import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setDegree, setIsDarkMod } from '../actions/weatherActions'
import { MsgModal } from './MsgModal'

export function AppHeader() {
    const { darkMod, error } = useSelector(state => state.weatherModule)
    const [isDark, setIsDark] = useState(false)
    const [C_or_F, setC_or_F] = useState('℃')
    // const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDegree(C_or_F))
    }, [C_or_F])
    useEffect(() => {
        dispatch(setIsDarkMod(isDark))
    }, [isDark])

    const setClassName = () => {
        return darkMod ? 'main-layout app-header dark' : 'main-layout app-header'
    }
    const onSetIsDark = () => {
        if (isDark) {
            document.querySelector('.weather-app').classList.remove('dark')
        } else {
            document.querySelector('.weather-app').classList.add('dark')
        }
        setIsDark(!isDark)
    }
    const degreeType = () => {
        (C_or_F === '℃') ? setC_or_F('℉') : setC_or_F('℃')
    }
    return (
        <header className={setClassName()}>
            <nav className="main-nav flex space-between">
                {/* <button onClick={() => history.goBack()}>Back</button> */}
                {isDark ? <button onClick={onSetIsDark}>Toggle light</button> :
                    <button onClick={onSetIsDark}>Toggle Dark</button>}
                <button onClick={degreeType}>{C_or_F}</button>
                <div className="links flex space-between">
                    <Link to='/'> <img src="imgs/logo.png" alt="" />weather app</Link>
                    <Link to='/favoritCities'>favorit cities</Link>
                </div>
            </nav>
            {error && <MsgModal msg={error} />}
        </header>
    )
}
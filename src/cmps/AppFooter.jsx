import React from "react"
import { useSelector } from "react-redux"

export function AppFooter() {
  const { darkMod } = useSelector(state => state.weatherModule)
  const setClassName = () => {
    return darkMod ? 'app-footer dark flex align-center justify-center' : 'app-footer flex align-center justify-center'
  }
  return (
    <footer className={setClassName()}>
      <div className="flex justify-center align-center">
        Coffeerights 2020
      </div>
    </footer>
  )
}
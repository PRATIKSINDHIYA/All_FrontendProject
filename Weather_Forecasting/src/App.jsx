import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import WeatherForecast from './Components/WeatherForecast'
import CurrentWeather from './Components/CurrentWeather'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<CurrentWeather/>}/>
        <Route path ="/CurrentWeather" element={<CurrentWeather/>} />
        <Route path="/WeatherForecast" element={<WeatherForecast/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
 
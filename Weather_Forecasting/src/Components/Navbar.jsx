import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({input}) => {
    return (
        <>
            <div class="header">
                <div class="brandname">Weather</div>
                <div class="nav">
                    <ul>
                        <li className='first'>
                            <Link  className='first' to="/" >Current</Link>
                        </li>
                        <li className='second'>
                            <Link className="second" to={`/WeatherForecast?city=${input}`}>Forecast</Link>
                            
                        </li>
   
                </ul>
            </div>
        </div >
    </>
  )
}

export default Navbar

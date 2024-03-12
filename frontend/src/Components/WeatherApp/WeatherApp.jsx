import React, { useState } from 'react'
import axios from 'axios'
import Weather from '../Weather'

const WeatherApp = () => {
    const [data, setData] = useState({})
    const [location, setlocation] = useState("")



    const API_KEY = "28bf8f7ba939bf4dd5e23b3c12de7757"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`


    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url)
                .then((response) => {
                    setData(response.data);
                })
            setlocation("")
        }
    }
    return (
        <div className='w-full h-full relative'>
            <div className='text-center p-4'>
                <input type="text" className='py-3 px-6 w-[700px]
                 text-lg rounded-3xl border border-gray-200
                  text-gray-600 placeholder:text-gray-400 focus: outline-none bg-white-600/100 shadow-md'
                    placeholder='Search location'
                    value={location}
                    onChange={(event) => setlocation(event.target.value)}
                    onKeyDownCapture={searchLocation} />
                <div className="search_icon">


                </div>
            </div>
            <Weather weatherData={data} />
        </div>
    )
}

export default WeatherApp

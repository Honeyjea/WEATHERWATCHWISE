import { TbMapSearch } from 'react-icons/tb'
import { FaSearchLocation } from 'react-icons/fa'
import { useState } from 'react'
import Header from './components/Header';
import DetailsCard from './components/DetailsCard';
import SummaryCard from './components/SummaryCard';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY
 
  // State variables
  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unknown location')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

  // Function to handle input change in the search bar
  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }
  
  // Function to handle search button click

  const handleSubmit = (event) => {
    event.preventDefault()
    getWeather(searchTerm)
  }

    // Function to fetch weather data from OpenWeatherMap API
  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try {
      let res = await fetch(`${process.env.REACT_APP_URL+how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if(data.cod != 200) {
        setNoData('Location Not Found')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const {latitude, longitude} = location.coords
    getWeather([latitude, longitude])
  }

  return (
    <div className="container">
      <div className="blur" style={{top: '-10%', right: '0'}}></div>
      <div className="blur" style={{top: '36%', left: '-6rem'}}></div>
      <div className="content">
        <div className="form-container">
          <div className="name">
          <div class="nav-item">
            <div className="logo">
      <img
        src={require('./LOGO.png')}
        alt="Project Logo"
        className="image"
        style={{ width: '80px', height: '80px', borderRadius: '50%'}}
      />
      Weather Watch Wise
      <div class="ping"></div>
    </div>
    </div>
            <div className="city">
              <TbMapSearch />
              <p>{city}</p>
            </div>
          </div>
          <div className="search">
            <h1>The Weather App <br/> &nbsp; &nbsp; You Need !</h1>
            <hr />
            <form className="search-bar" noValidate onSubmit={handleSubmit}>
              <input  type="text" name="" id="" placeholder='Search Place' onChange={handleChange} required/>
              <button className="s-icon">
                  <FaSearchLocation
                    className="bigger-icon"
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(myIP)
                    }}
                  />
              </button>
            </form>
          </div>
          
        </div>
        <div className="info-container">
          <Header />
          {weatherData.length === 0 ? 
              <div className="nodata">
                <h1>{noData}</h1>
              </div> : 
              <>
                <h1>Today</h1>
                <DetailsCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="title">More On {city}</h1>
                <ul className="summary">
                  {weatherData.list.map((days, index) =>{
                    if(index > 0){
                      return (<SummaryCard key={index} day={days} />)
                    }
                  })}
                </ul>
              </>
            }
        </div>
      </div>
    </div>
  );
}

export default App;

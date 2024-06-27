import { useEffect, useState } from "react";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {ContextProvider}  from "./context/context.js";
import Navbar from "./Components/navbar.js";
import InfoSection from "./Components/infoSection.js";
import DetailsSection from "./Components/detailsSection.js";
import day from './assets/weather-icons/day.svg'
import night from './assets/weather-icons/night.svg'
import rainy from './assets/weather-icons/rainy-7.svg'
import thunder from './assets/weather-icons/thunder.svg'
import snowy from './assets/weather-icons/snowy-6.svg'
import cloudyDay from './assets/weather-icons/cloudy-day-3.svg'
import cloudyNight from './assets/weather-icons/cloudy-night-3.svg'

function App() {
  const [city , setCity] = useState('');
  const [dark , setDark] = useState(false);
  const [icon , setIcon]= useState(day)
  const [weatherObj , setWeatherObj]=useState({"name":null, "day":null  , 'weather':'' ,"Temperature":null , "Feels":null , "Humidity":null , "Wind":null})
  
  useEffect(()=>{
    const curr = new Date()
    if(curr.getHours() > 18) setDark(true)
    else setDark(false)
  },[])

  useEffect(()=>{
    console.log(icon)
    if(weatherObj.weather==='')
        return;
    if(weatherObj.weather.includes('SUNNY') || weatherObj.weather.includes('CLEAR') ){
      if(weatherObj.day) setIcon(day)
      else setIcon(night)
    }
    if(weatherObj.weather.includes('CLOUDY')){
      if(weatherObj.day) setIcon(cloudyDay)
      else setIcon(cloudyNight)
    }
    if(weatherObj.weather.includes('SNOW')) setIcon(snowy)
    if(weatherObj.weather.includes('RAIN')) setIcon(rainy)
    if(weatherObj.weather.includes('THUNDER')) setIcon(thunder)
  },[weatherObj])

  const errorToast = (message)=>{
    toast.error(message || 'Error' , {
      position: "top-right",
      autoClose:4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress:undefined,
      theme: 'colored'
    })
  }
  
  const handleSearch = async()=>{
    if(!city){
      errorToast('Enter some City Name')
      return
    }
    toast.promise(
      handleLocation() , {
        pending:'Fetching Data',
        position:'top-center',
        autoClose:4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress:undefined,
        theme: 'colored'
      }
    )
  }
  
  
  const handleLocation =async()=>{
    try{
      const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search`,{
        params:{
          apikey:'pWw8cV2VMULWilQ7mzu1haaGwANX6Fgp',
          q:city
        }
      })
      let data = await response.data
      if(data.length===0)
        throw new Error('Invalid City Name')
      handleWeather(data[0].Key  , city);
    }catch(error){
      errorToast(error.message)
    }
  }
  
  const handleWeather=async(key , city)=>{
    try{
      const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}` , {
        params:{
          apikey:'pWw8cV2VMULWilQ7mzu1haaGwANX6Fgp',
          details:true
        }
      })
      if(!response){
        throw new Error('Could not fetch data')
      }
      let data = await response.data;
      console.log(data)
      setWeatherObj({"name":city , "day":data[0].IsDayTime ,"weather":data[0].WeatherText.toUpperCase() ,
        "Temperature":data[0].Temperature.Metric.Value , "Feels":data[0].RealFeelTemperature.Metric.Value,
        "Humidity":data[0].RelativeHumidity , "Wind":data[0].Wind.Speed.Metric.Value
      })
    }catch(error){
      errorToast(error.message)
    }
  }
  
  
  
  return (
    <ContextProvider value={{dark , setDark , city , setCity , weatherObj , handleSearch}}>
    <div className="flex outer-wrapper" style={{ backgroundColor:dark?'rgb(40 ,40,40)':"white"}}>
    
    <Navbar/>
    
    <div style={{color:dark?'white':'black'}} className="flex inner-wrapper">
    <div style={{fontWeight:'bold' , fontSize:'3rem' , textAlign:'center'}}>{weatherObj.name || 'Search Cities!!'}</div>
    <div className="type-wrapper flex" style={{flexDirection:'column' , filter:(!weatherObj.name)?'blur(5px)':'none'}}>
    <img src={icon} alt="" style={{width:'200px' , margin:'-5vh'}}/>
    <div style={{fontSize:'2.5rem' , fontWeight:'bold' , textAlign:"center"}}>{weatherObj.weather || "Weather?"}</div>
    </div>
    <InfoSection/>
    <DetailsSection/>
    </div>
    
    <ToastContainer 
    newestOnTop={true}/>
    
    </div>
    </ContextProvider>
  )
}

export default App;

import { useState } from "react";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {ContextProvider}  from "./context/context.js";
import Navbar from "./Components/navbar.js";
import InfoSection from "./Components/infoSection.js";
import DetailsSection from "./Components/detailsSection.js";

function App() {
  const [city , setCity] = useState('');
  const [dark , setDark] = useState(false);
  const [error ,  setError] = useState('');
  const [loading , setLoading] = useState(false);
  const [weatherObj , setWeatherObj]=useState({"name":null, "icon":null , 'weather':'' ,"Temperature":null , "Feels":null , "Humidity":null , "Wind":null})
  
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
      const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search`,{
        params:{
          apikey:'',
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
      const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}` , {
        params:{
          apikey:'',
          details:true
        }
      })
      if(!response){
        throw new Error('Could not fetch data')
      }
      let data = await response.data;
      console.log(data)
      setWeatherObj({"name":city , "icon":data[0].WeatherIcon , "weather":data[0].WeatherText ,
        "Temperature":data[0].Temperature.Metric.Value , "Feels":data[0].RealFeelTemperature.Metric.Value,
        "Humidity":data[0].RelativeHumidity , "Wind":data[0].Wind.Speed.Metric.Value
      })
    }catch(error){
      errorToast(error.message)
    }
  }
  
  
  
  return (
    <ContextProvider value={{dark , setDark , city , setCity , weatherObj , handleSearch}}>
    <div className="flex outer-wrapper" style={{ backgroundColor:dark?'rgb(40 ,40,40)':"rgb(240 , 240 ,240)"}}>
    
    <Navbar/>
    
    <div style={{color:dark?'white':'black'}} className="flex inner-wrapper">
    <div style={{fontWeight:'bold' , fontSize:'2.5rem'}}>{(!weatherObj.name)?'Search Cities':weatherObj.name}</div>
    <div className="type-wrapper">
    <h2>{weatherObj.weather}</h2>
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

import hightemp from '../assets/hightemp.svg'
import midtemp from '../assets/midtemp.svg'
import lowtemp from '../assets/lowtemp.svg'
import Humidity from '../assets/humd.svg'
import Wind from '../assets/wind.svg'
import Feels from '../assets/feel.svg'
import { useContext } from 'react'
import {Context} from '../context/context.js'

const InfoSection = ()=>{
    
    const {weatherObj , dark} = useContext(Context)
    return(
        <div style={{filter:(!weatherObj.name)?'blur(5px)':'none' ,color:dark?'white':'black'  , display:"grid" , gridTemplateColumns:'1fr 1fr' , gap:'40px' , }}>
        <p className="flex">
        <img src={weatherObj.Temperature>35?hightemp:(weatherObj.Temperature<20?lowtemp:midtemp)}/>
        <div style={{paddingLeft:'10px'}}><span>{weatherObj.Temperature}°C </span><br/>Temperature</div>  
        </p>
        {
            [{"src":Feels , "field":"Feels" , "value":weatherObj.Feels  , "unit":"°C"} ,
            {"src":Humidity , "field":"Humidity" , "value":weatherObj.Humidity , "unit":"%"} , 
            {"src":Wind , "field":'Wind' , "value":weatherObj.Wind , "unit":"Kmph"}].map((item , index)=>{
                    return(
                        <p className="flex" key={index}>
                        <img style={{width:'50px'}} src={item.src}/>
                        <div style={{paddingLeft:'10px'}}><span>{item.value} {item.unit}  </span><br/>{item.field}</div>
                        </p>
                    )
                })
            }
        </div>
            
        )
    }

    export default InfoSection
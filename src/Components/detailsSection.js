import { useContext } from "react"
import {Context} from "../context/context.js"

const DetailsSection = ()=>{
    const{weatherObj} = useContext(Context)
    return(<div className="details-wrapper">
        {weatherObj.Feels>35&&(<span>Recommended to citizens of {weatherObj.name} stay hydrated to excessive heat, high risk of heat waves!</span>)}
        {weatherObj.Feels>25&&weatherObj.Feels<=35&&(<span>Fairly Moderate climate here at {weatherObj.name} but still stay as cool as possible!</span>)}
        {weatherObj.weather.includes('SUNNY')&&weatherObj.Feels<30&&(<span>Great day for outing due to  the clear skies.</span>)}
        {weatherObj.weather.includes('RAIN')&&(<span>DO Carry an Umbrella.</span>)}
        {weatherObj.weather.includes('SNOW')&&(<span>Enjoy the Snowfall.</span>)}
        {weatherObj.Humidity>70&&(<span>Nevertheless, a really humid day overall!</span>)}
    </div>)
}

export default DetailsSection
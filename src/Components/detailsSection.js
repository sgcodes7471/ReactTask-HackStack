import { useContext } from "react"
import {Context} from "../context/context.js"

const DetailsSection = ()=>{
    const{weatherObj} = useContext(Context)
    return(<div className="details-wrapper">
        {weatherObj.Temperature>35&&(<span>Recommended to citizens of {weatherObj.name} stay hydrated to excessive heat, high risk of heat waves!</span>)}
        {weatherObj.Temperature>25&&weatherObj.Temperature<=35&&(<span>Fairly Moderate climate here at {weatherObj.name} but still stay as cool!</span>)}
        {weatherObj.weather.includes('SUNNY')&&(<span>Great day for outing due to  the clear skies.</span>)}
        {weatherObj.weather.includes('RAIN')&&(<span>DO Carry an Umbrella</span>)}
        {weatherObj.weather.includes('CLOUDY')&&(<span>DO Carry an Umbrella</span>)}
        {weatherObj.weather.includes('SNOW')&&(<span>Enjoy the Snowfall</span>)}
    </div>)
}

export default DetailsSection
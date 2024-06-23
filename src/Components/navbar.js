import {Context} from "../context/context.js"
import sun from '../assets/sun.svg'
import search from '../assets/search.svg'
import { useContext } from "react"

const Navbar = ()=>{

    const  {setCity , dark , setDark , handleSearch}  = useContext(Context)

    return(
        <>
        <div className='flex'>
        <img className="dark-btn" src={sun} alt={dark?'Light':'Dark'} onClick={()=>setDark(!dark)}/>
        <input type='text' placeholder='Enter City Name...' 
        style={{color:dark?'white':'black'}}
        onChange={(e)=>{setCity(e.target.value)}}/>
        <img src={search} alt='Search' onClick={handleSearch}/>
        </div>
        </>
    )
}

export default Navbar
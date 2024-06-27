import {Context} from "../context/context.js"
import sun from '../assets/sun.svg'
import search from '../assets/search.svg'
import { useContext } from "react"

const Navbar = ()=>{

    const  {setCity , dark , setDark , handleSearch}  = useContext(Context)

    return(
        <>
        <div className='flex'>
        <img className="dark-btn" src={sun} alt={dark?'Light':'Dark'} 
        style={{transform:dark?'rotateZ(45deg)':'rotateZ(0deg)' , transition:'0.5s'}}
        onClick={()=>setDark(!dark)}/>
        <input type='text' placeholder='Enter City Name...' 
        style={{color:dark?'white':'black'}}
        onChange={(e)=>{setCity(e.target.value)}} required/>
        <img src={search} alt='Search' className="search-btn" onClick={handleSearch}/>
        </div>
        </>
    )
}

export default Navbar
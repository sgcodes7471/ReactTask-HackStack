import { createContext } from "react"

export const Context = createContext({
    dark:false,
    setDark:()=>{},
    city:'',
    setCity:()=>{},
    weatherObj:{},
    handleSearch:()=>{}
})

export const ContextProvider  = Context.Provider


'use client'
import { createContext, useState, useContext } from "react";


const AppContext = createContext<any>(undefined)

export default function AppWrapper({children} : {children: React.ReactNode}) {

    let [noRead, setnoRead] = useState(0)
    let [isModalTech, setIsModalTech] = useState(0)
    return (
        <AppContext.Provider value={{noRead,setnoRead,isModalTech,setIsModalTech}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext)
}
import { useContext,createContext,useState } from 'react'

const ContextProvider=createContext();
export const Context=({children})=>{
    //states
    const [login,setlogin]=useState(false)
    const [admin,setadmin]=useState(false)
    const [message,setmessage]=useState('')
    const setNewMessage=(data)=>{
        setmessage(data)
    }
    const setAdmin=(data)=>{
        setadmin(data)
    }
    const setLogin=(data)=>{
        setlogin(data);
    }
    return (
        <ContextProvider.Provider value={{login,setLogin,admin,setAdmin,message,setNewMessage}}>
        {children}
        </ContextProvider.Provider>
    )
}
const useStore=()=>{
    return useContext(ContextProvider);
}
export default useStore;

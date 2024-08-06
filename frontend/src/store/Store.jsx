import { useContext,createContext,useState } from 'react'

const ContextProvider=createContext();
export const Context=({children})=>{
    const [login,setlogin]=useState(false)
    const [admin,setadmin]=useState(false)
    const [message,setmessage]=useState('')
    const [refresh,setrefresh]=useState(false)
    const [index,setindex]=useState(0)
    const [userdata,setuserdata]=useState({concerns:[]})
    const [concerns,setConcerns]=useState([])
    const [solved,setSolved]=useState([])
    const setIndex=(data)=>{
        setindex(data)
    }
    const setUserData=(data)=>{
        setuserdata(data)
    }
    const setNewMessage=(data)=>{
        setmessage(data)
    }
    const setAdmin=(data)=>{
        setadmin(data)
    }
    const setLogin=(data)=>{
        setlogin(data);
    }
    const setRefresh=(data)=>{
        setrefresh(data)
    }
    return (
        <ContextProvider.Provider value={{login,setLogin,admin,setAdmin,message,setNewMessage,refresh,setRefresh,userdata,setUserData,index,setIndex,concerns,setConcerns,solved,setSolved}}>
        {children}
        </ContextProvider.Provider>
    )
}
const useStore=()=>{
    return useContext(ContextProvider);
}
export default useStore;

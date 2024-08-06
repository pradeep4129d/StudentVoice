import { Navigate, Route, Routes } from 'react-router-dom'
import { Auth } from '../components/Auth'
import Global from '../components/Global'
import Myconcerns from '../components/Myconcerns'
import { Profile } from '../components/Profile'
import Solved from '../components/Solved'
import './App.css'
import useStore from './store/Store.jsx'
import { useEffect } from 'react'
import { Message } from '../components/Message.jsx'
import { AddConcern } from '../components/AddConcern.jsx'

function App() {
  const {login,setLogin,setNewMessage,setAdmin}=useStore()
  const token=JSON.parse(sessionStorage.getItem('token'))
  useEffect(()=>{
    const token=JSON.parse(sessionStorage.getItem('token'))
    if(token){
      token.admin&&setAdmin(token.admin)
    }
  },[])
  return (
    <>
      {(login||token)&&<span onClick={()=>{
        setNewMessage("Logout successfull")
        sessionStorage.removeItem('token');
        setLogin(false)
      }} className='logout'><ion-icon name="log-out-outline"></ion-icon></span>}
      <Routes>
        <Route path='/' element={<Global/>}/>
        <Route  path='/myconcerns' element={<Myconcerns/>}>
            <Route path='/myconcerns/addconcern' element={<AddConcern data={{title:'New Concern',new:true,admintab:false}}/>}/>
            <Route path='/myconcerns/editconcern' element={<AddConcern data={{title:'Edit Concern',new:false,admintab:false}}/>}/>
            <Route path='/myconcerns/updateconcern' element={<AddConcern data={{title:'Edit Concern',new:false,admintab:false}}/>}/>
        </Route>
        <Route path='/solved' element={<Solved/>}/>
        <Route path='/profile' element={<Profile/>}>
          <Route path='/profile/auth' element={<Auth/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

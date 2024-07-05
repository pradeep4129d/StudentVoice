import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStore from '../src/store/Store';
import { Loading } from './Loading';
import { ConcernCard } from './ConcernCard';

export const UserConcernTab = () => {
    const [concerns,setConcerns]=useState([])
    const [isloading,setIsloading]=useState(false)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const token=JSON.parse(sessionStorage.getItem('token'))
        const fetchdata=async()=>{
        if(token){
            setIsloading(true)
            try {
                const responce=await fetch('http://localhost:3000/getconcern',{
                method:'POST',
                headers:{
                    'authorization':token.token,
                    'Content-Type':'application/json'},
                })
                const res=await responce.json()
                console.log(res)
                setConcerns(res.data)
                setIsloading(false)
            }
            catch(error){
                console.log(error)
            }
        }
    }
    fetchdata()
},[])
return (
    <>
    {isloading&&<Loading/>}
    <div className='user-concern'>
        <div onClick={()=>{navigate('/myconcerns/addconcern')}} className="add"><ion-icon name="add-outline"></ion-icon><span>Add</span></div>
        {(concerns.length === 0) ? (
            <p>No Concerns</p>
        ) : (
        <div className='concern-container'>
            {concerns.map((concern, index) => (
                <ConcernCard key={index} data={{title:concern.title,description:concern.description,image:concern.images,location:concern.location,block:concern.block,progress:concern.state}}/>
            ))}
        </div>
)}

    </div>
    </>
)}

export const AdminConcernTab = () => {
return (
    <div>AdminConcernTab</div>
)}

const Myconcerns = () => {
    const {login,admin,setAdmin}=useStore();
    const navigate=useNavigate()
    const token=JSON.parse(sessionStorage.getItem('token')) 
    if(token){
        setAdmin(token.admin)
    }
return (
    <div className='main-tabs'>
        <Outlet/>
        {!(login||token)?(
            <div className='l-btn'>
                <p>Oops..nothing here</p>
                <button className='login-btn' onClick={()=>{
                    navigate('/profile/auth')}}>Login</button>
            </div>
        ):(
            (admin)?(
                <AdminConcernTab/>
            ):(
                <UserConcernTab/>
            )
        )}
    </div>
)}

export default Myconcerns
import React, { useEffect, useState } from 'react'
import { Outlet, useFetcher, useNavigate } from 'react-router-dom'
import useStore from '../src/store/Store';
import { Loading } from './Loading';
import { ConcernCard } from './ConcernCard';

export const UserConcernTab = (props) => {
    const [isloading,setIsloading]=useState(false)
    const navigate=useNavigate()
    const {refresh} = useStore()
return (
    <>
    {isloading&&<Loading/>}
    <div className='user-concern'>
        <div onClick={()=>{navigate('/myconcerns/addconcern')}} className="add"><ion-icon name="add-outline"></ion-icon><span>Add</span></div>
        {(props.data.length === 0) ? (
            <p>No Concerns</p>
        ) : (
        <div className='concern-container'>
            {   
                props.data.map((concern, index) => (
                <ConcernCard key={index} data={{title:concern.title,description:concern.description,image:concern.images,location:concern.location,block:concern.block,progress:concern.state,public:concern.public,Id:concern._id,likecount:concern.likeCount,index:index,gpage:false}}/>
            ))}
        </div>
)}

    </div>
    </>
)}

export const AdminConcernTab = () => {
    const {userdata,refresh,blockConcerns,setBlockConcerns}=useStore()
    const [isloading,setIsloading]=useState(false)
    console.log(blockConcerns)
    const block=['CSE',"ECE","EEE","ME","MBA","BSH","Polytech","Pharmacy"]
    useEffect(()=>{
        const token=JSON.parse(sessionStorage.getItem('token'))
        const fetchdata=async()=>{
            setIsloading(true)
            const response =await fetch('http://localhost:3000/blockconcern',{
                method:'POST',
                headers: {
                    'authorization':token.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({block:userdata.block})
                })
                const res=await response.json()
                console.log(res)
                if(res.success){
                    setBlockConcerns(res.concerns.sort((a,b)=>b.concern.likeCount-a.concern.likeCount))
                }
                setIsloading(false)
        }
        if(token){fetchdata()}
    },[refresh])
return (
    <>
    {isloading&&<Loading/>}
    <div className='user-concern'>
        {(blockConcerns.length === 0) ? (
            <p>No Posts</p>
        ) : (
        <div className='concern-container'>
            {   
                blockConcerns.map((concern, index) => (
                <ConcernCard key={index} data={{title:concern.concern.title,description:concern.concern.description,image:concern.concern.images,location:concern.concern.location,block:concern.concern.block,progress:concern.concern.state,public:concern.concern.public,Id:concern.concern._id,likecount:concern.concern.likeCount,index:index,gpage:false,admintab:true,username:concern.username}}/>
            ))}
        </div>
        )}
    </div>
    </>
)}

const Myconcerns = () => {
    const {login,setLogin,admin,setAdmin}=useStore();
    const {refresh,userdata,setUserData} = useStore()
    const [concerns,setConcerns]=useState(userdata.concerns)
    const navigate=useNavigate()
    const token=JSON.parse(sessionStorage.getItem('token')) 
    useEffect(()=>{
        const token=JSON.parse(sessionStorage.getItem('token')) 
        token&&setLogin(true)
        console.log(userdata.concerns)
        setConcerns(userdata.concerns)
        console.log('refrehed')},[refresh])
    if(token){
        setAdmin(token.admin)
    }
return (
    <div className='main-tabs'>
        <Outlet/>
        {!(login||token)?(
            <div className='l-btn'>
                <p>Oops..nothing here</p>
            </div>
        ):(
            (token.admin)?(
                <AdminConcernTab/>
            ):(
                <UserConcernTab data={concerns}/>
            )
        )}
    </div>
)}

export default Myconcerns
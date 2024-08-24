import React, { useState } from 'react'
import { useEffect } from 'react'
import useStore from '../src/store/Store'
import { Loading } from './Loading'
import { ConcernCard } from './ConcernCard'

const Global = () => {
  const {userdata,setUserData,refresh,login,admin,setLogin,concerns,setConcerns}=useStore()
  const token=JSON.parse(sessionStorage.getItem('token'))
  if(token){
    setLogin(true)
  }
  const [isloading,setIsLoading]=useState(false)
  useEffect(()=>{
    const token=JSON.parse(sessionStorage.getItem('token'))
    if(token){
      setLogin(true)
    }
    const fetchdata=async()=>{
      const response =await fetch(`http://localhost:3000/get${token.admin?'admin':'user'}data`,{
        method:'POST',
        headers: {
            'authorization':token.token,
            'Content-Type': 'application/json'
        },
        })
        const res=await response.json()
        console.log(res)
        if(res.success){
          setUserData(res.data)
        }
    }
    if(token){ 
      if(token.admin){
        fetchdata()
      }
      else{
          if(!userdata.concerns.length){
            fetchdata()
          } 
        }
      }
    const fetchConcern=async()=>{
      setIsLoading(true)
      const response =await fetch('http://localhost:3000/getconcerns',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        const res=await response.json()
        console.log(res)
        if(res.success){
          setIsLoading(false)
          setConcerns(res.concerns.sort((a,b)=>b.likeCount-a.likeCount))
        }
    }
    if(!concerns.length){
      fetchConcern()
    }
  },[refresh])
  return (
    <>
    {isloading&&<Loading/>}
    <div className='main-tabs'>
        {(concerns.length === 0) ? (
            <p>No Concerns</p>
        ) : (
        <div className='concern-container'>
              {
                concerns.map((concern, index) => (
                <ConcernCard key={index} data={{title:concern.title,description:concern.description,image:concern.images,location:concern.location,block:concern.block,progress:concern.state,public:concern.public,Id:concern._id,likecount:concern.likeCount,index:index,gpage:true,admintab:false}}/>
            ))}
        </div>
  )}

    </div>
    </>
  )
}

export default Global
import React, { useEffect, useState } from 'react'
import { Loading } from './Loading'
import { ConcernCard } from './ConcernCard'

const Solved = () => {
    const [isloading,setLoading]=useState(false)
    const [concerns,setConcerns]=useState([])
    useEffect(()=>{
        const fetchdata=async()=>{
            setLoading(true)
            const response =await fetch('http://localhost:3000/getsolvedconcern',{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                })
                const res=await response.json()
                console.log(res)
                if(res.success){
                    setLoading(false)
                    setConcerns(res.concerns)
                }
            }
            fetchdata()
    },[])
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

export default Solved
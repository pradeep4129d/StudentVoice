import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useStore from '../src/store/Store'

export const AdminFeedbackTab = () => {
return (
    <div>AdminFeedbackTab</div>
)
}

export const UserFeedbackTab = () => {
return (
    <div>UserFeedbackTab</div>
)
}

export const Feedback = () => {
    const {login,admin,setAdmin}=useStore();
    const navigate=useNavigate()
    const token=JSON.parse(sessionStorage.getItem('token'))
    useEffect(()=>{
        const token=JSON.parse(sessionStorage.getItem('token'))
        if(token){
        setAdmin(token.admin)}
    },[])
return (
    <div className='main-tabs'>
        {!(login||token)?(
            <div className='l-btn'>
                <p>Oops..nothing here</p>
            </div>
        ):(
            (admin)?(
                <AdminFeedbackTab/>
            ):(
                <UserFeedbackTab/>
            )
        )}
    </div>
)
}

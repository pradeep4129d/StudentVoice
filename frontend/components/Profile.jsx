import React from 'react'
import useStore from '../src/store/Store' 
import { Link, useNavigate,Outlet } from 'react-router-dom';

export const Profile = () => {
    const {login}=useStore();
    const navigate=useNavigate()
    const token=sessionStorage.getItem('token')
return (
    <div className='main-tabs'>
        <Outlet/>
        {!(login||token)?(
            <div className='l-btn'>
                <p>Oops..nothing here</p>
                <button className='login-btn' onClick={()=>{navigate('/profile/auth')}}>Login</button>
            </div>
        ):(
            <div>
                <h1>Profile</h1>
            </div>
        )}
    </div>
)
}

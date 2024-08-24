import React, { useState } from 'react'
import useStore from '../src/store/Store';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loading } from './Loading';

export const Auth = () => {
    const [credentials,setCredentials] =useState({username:'',password:''})
    const {setLogin,setAdmin,setNewMessage,setUserData}=useStore();
    const [isloading,setIsloading]=useState(false)
    const navigate=useNavigate()
return (
    <>
    {isloading&&<Loading/>}
    <div className='login-container'> 
        <div className="container">
        <div className="card">
            <a className="login">Login</a>
            <div className="inputBox">
                <input type="text" required="required" onChange={(e)=>{setCredentials({...credentials,username:e.target.value})}}/>
                <span className="user">Username</span>
            </div>
            <div className="inputBox">
                <input type="password" required="required" placeholder='DD/MM/YYYY' onChange={(e)=>{setCredentials({...credentials,password:e.target.value})}}/>
                <span>Password</span>
            </div>
            <button className="enter" onClick={async()=>{
                setIsloading(true)
                try {
                    const response =await fetch('http://localhost:3000/login',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(credentials)
                    })
                    const res=await response.json()
                    console.log(res)
                    if(res.login){
                        setNewMessage('Login successful')
                        setUserData(res.data.data)
                        setIsloading(false)
                        setLogin(true)
                        setAdmin(res.admin)
                        const tokendata={token:res.data.token,admin:res.admin}
                        sessionStorage.setItem('token',JSON.stringify(tokendata))
                        navigate('/profile')
                    }
                    else{
                        setIsloading(false)
                        setNewMessage(res.msg)
                    }
                }
                catch(e){
                    console.log(e)
                }
            }}>Enter</button>
        </div>
    </div>
    </div>
    </>
)
}

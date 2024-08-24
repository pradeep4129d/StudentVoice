import React, { useState } from 'react'
import useStore from '../src/store/Store'
import { Loading } from './Loading'; 
import { Link, useNavigate,Outlet } from 'react-router-dom';

export const Profile = () => {
    const {login,userdata,setNewMessage,setUserData,blockConcerns}=useStore();
    const [isloading,setIsLoading]=useState(false)
    const [password,setPassword]=useState(userdata.password)
    const navigate=useNavigate()
    const token=JSON.parse(sessionStorage.getItem('token'))
    console.log(password)
    const handleSubmit=async()=>{
        setIsLoading(true)
        const response = await fetch(`http://localhost:3000/${(token.admin)?'updateadmin':'updateuser'}`, {
            method: 'PUT',
            headers:{'authorization':token.token,
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({password:password})
        });
        const res=await response.json()
        setIsLoading(false)
        if(res.success){
            setNewMessage(res.message)
            setUserData(res.data)
        }
        else{
            setNewMessage("server Error")
        }
        console.log(res)
    }
return (
    <>
    {isloading&&<Loading/>}
    <div className='main-tabs'>
        <Outlet/>
        {!(login||token)?(
            <div className='l-btn'>
                <p>Oops..nothing here</p>
                <button className='login-btn' onClick={()=>{navigate('/profile/auth')}}>Login</button>
            </div>
        ):(
            <div className='profile'>
                <div className="back-ball">
                <ion-icon name="person-outline"></ion-icon>
                </div>
                <div className="profile-body">
                    <div className="userdata">
                        <h2 id='username'>{userdata.username}</h2>
                        <div class="group">
                                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                                </svg>
                                <input class="input" type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="editpass">
                        <button onClick={handleSubmit}>Edit</button>
                        </div>
                        <div className="post-count">
                           <p>{(!token.admin)?<>Your Posts</>:<>Block Concerns</>}</p>
                           <div onClick={()=>{navigate('/myconcerns')}} id='l'>{(!token.admin)?userdata.concerns.length:blockConcerns.length}<ion-icon name="chevron-forward-outline"></ion-icon>
                           </div></div>
                        <div className="post-count">
                           <p>Solved</p>
                           <div onClick={()=>{navigate('/solved')}} id='l'><ion-icon name="chevron-forward-outline"></ion-icon>
                        </div></div>
                    </div>
                </div>
            </div>
        )}
    </div>
    </>
)
}

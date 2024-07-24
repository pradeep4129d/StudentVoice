import React, { useDebugValue, useEffect, useState } from 'react'
import useStore from '../src/store/Store';
import { Loading } from './Loading';
import { useNavigate } from 'react-router-dom';
import { AdminConcernTab } from './Myconcerns';

export const ConcernCard = (props) => {
  const token=JSON.parse(sessionStorage.getItem('token'))
  const [editable,setEditable]=useState(false)
  const [editedValue,setEditedValue]=useState('')
  console.log(editedValue)
  const {setNewMessage,setRefresh,refresh,userdata,setUserData,setIndex,login}=useStore()
  const [dropclass,setdropclass]=useState('')
  const [likestate,setLikeState]=useState({count:props.data.likecount,state:((token)?token.admin:false)?'like':(!login)?'Like':userdata.liked.includes(props.data.Id)?"Liked":"Like"})
  function arrayBufferToImage(buffer) {
    const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
    return URL.createObjectURL(blob);
  }
  const [loading,setloading]=useState(false)
  const block=['CSE',"ECE","EEE","ME","MBA","BSH","Polytech","Pharmacy"]
  const imageUrl=''
  const navigate=useNavigate()
  if(props.data.image[0]){
    const imageUrl = arrayBufferToImage(props.data.image[0].data);}
  const handleclick=async()=>{
    setloading(true)
    try {
      const token=JSON.parse(sessionStorage.getItem('token'))
      const responce=await fetch('http://localhost:3000/deleteconcern',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'},
          body:JSON.stringify({Id:props.data.Id})
      })
      const res=await responce.json()
      console.log(res)
      if(res){
        setloading(false)
        if(!props.data.admintab){
            setUserData(res.data)
        }
        setNewMessage(res.message)
        setRefresh(refresh?false:true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {loading&&<Loading/>}
    <div className='concern-card'>
      {props.data.admintab&&<h4 className='username'>Posted by: {props.data.username}</h4>}
      <div className="image">
            <div className="menu">
              <button onClick={()=>{
                !props.data.gpage&&setdropclass(dropclass===''?'t':'')}} className="menu-icon"><ion-icon name="ellipsis-vertical"></ion-icon></button>
              <button className={"editBtn "+dropclass} onClick={()=>{
                setIndex(props.data.index)
                if(!props.data.admintab){
                  navigate('/myconcerns/editconcern')
                }
                else{
                  setEditable(true)
                }
              }}>
                <svg height="1em" viewBox="0 0 512 512">
                  <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                  ></path>
                </svg>
              </button>
              <button className={"bin-button "+dropclass} onClick={handleclick} >
                  <svg className="bin-top"viewBox="0 0 39 7"fill="none"xmlns="http://www.w3.org/2000/svg">
                    <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
                    <line x1="12"  y1="1.5" x2="26.0357"y2="1.5"stroke="white" strokeWidth="3"
                    ></line>
                  </svg>
                  <svg className="bin-bottom"viewBox="0 0 33 39"fill="none"xmlns="http://www.w3.org/2000/svg" >
                    <mask id="path-1-inside-1_8_19" fill="white">
                      <path
                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                      ></path>
                    </mask>
                    <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"fill="white"mask="url(#path-1-inside-1_8_19)"></path>
                    <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
                    <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
                  </svg>
              </button>
            </div>
            <button className="Btn" onClick={async()=>{
              if(login){
              setLikeState({count:(likestate.state==='Liked')?likestate.count-1:likestate.count+1,state:(likestate.state==='Liked')?"Like":"Liked"})
              try {
                const token=JSON.parse(sessionStorage.getItem('token'))
                const responce=await fetch('http://localhost:3000/likeupdate',{
                  method:'PUT',
                  headers:{
                    'authorization':token.token,
                    'Content-Type':'application/json'},
                    body:JSON.stringify({concernId:props.data.Id})
                })
                const res=await responce.json()
                console.log(res)
                if(res.success){
                  setUserData(
                    prevState=>{
                      const newConcerns=[...prevState.concerns]
                      const newLiked=[...prevState.liked]
                      if(!props.data.gpage){
                      newConcerns[props.data.index].likeCount=res.likecount;}
                      (newLiked.includes(props.data.Id))?newLiked.splice(newLiked.indexOf(props.data.Id),1):newLiked.push(props.data.Id)
                      return {
                        ...prevState,
                        concerns:newConcerns,
                        liked:newLiked
                      }
                    }
                  )
                }
              } catch (error) {
                console.log(error)
              }}
              else{
                setNewMessage('please login to like')
              }
            }}>
              <span className="leftContainer">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path></svg>
                <span className="like">
                  {likestate.state}
                </span>
              </span>
              <span className="likeCount">
                {likestate.count}
              </span>
            </button>
          {props.data.image[0]?(<img src={arrayBufferToImage(props.data.image[0].data)} alt="" />):(
            <div className="loader"></div>
          )}
      </div>
      <div className="concern-title">
          <h3>{props.data.title}</h3>
      </div>
      <div className="desc">
        <p>{props.data.description}</p>
      </div>
      <div className="progress">
        {(editable)?(
          <>
          <select name="" id="" onChange={(e)=>{setEditedValue(e.target.value)}}>
            <option value="Not Seen Yet">Not Seen Yet</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Solved">Solved</option>
          </select>
          <button className='update' onClick={async()=>{
            setloading(true);
            try {
              const token=JSON.parse(sessionStorage.getItem('token'))
              console.log(token.token)
              const response = await fetch(`http://localhost:3000/updateconcern`, {
              method: 'PUT',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({Id:props.data.Id,state:editedValue})
            });
          const res=await response.json()
          console.log(res)
          setloading(false)
          if(res.success)
          {
            setNewMessage(res.message)
            setEditable(false)
            setRefresh(refresh?false:true)
          }
        }
        catch(err) {
          console.log(err)
        }
          }}>Update</button>
          </>
        ):(<p>progress: {props.data.progress}</p>)}
        <div className="global">
        {
            props.data.public?(<p>Public<ion-icon name="eye"></ion-icon></p>):(<p>Private<ion-icon name="eye-off"></ion-icon></p>)
        }
        </div>
      </div>
      <div className="location">
        <p><ion-icon name="location"></ion-icon> {props.data.location} </p>
        <div>block:{block[JSON.parse(props.data.block)-1]}</div>
      </div>
    </div>
    </>
  )
}

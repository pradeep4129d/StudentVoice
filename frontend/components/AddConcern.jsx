import React, { useEffect, useState } from 'react'
import useStore from '../src/store/Store'
import { Loading } from './Loading'
import { useNavigate } from 'react-router-dom'

export const AddConcern = (props) => {
    const {setNewMessage,setUserData,userdata,index,refresh,setRefresh}=useStore()
    const [concern,setConcern]=useState({title:'',description:'',block:'1',location:'',public:true,images:[],index:(props.data.new)?'':index,concernId:(props.data.new)?'':userdata.concerns[index]._id})
    const [loading,setloading]=useState(false)
    const navigate=useNavigate()
    const formdata=new FormData;
    const handleSubmit = async () => {
        setloading(true)
        for (let i = 0; i < concern.images.length; i++) {
            formdata.append(`image${i}`, concern.images[i]);
        }
        formdata.append('details',JSON.stringify(concern))
        console.log(formdata)
        try {
            const token=JSON.parse(sessionStorage.getItem('token'))
            console.log(token.token)
            const response = await fetch(`http://localhost:3000/${(props.data.new)?'addconcern':'editconcern'}`, {
            method: 'PUT',
            headers:{'authorization':token.token},
            body:formdata
        });
        const res=await response.json()
        console.log(res)
        if(res){
            setloading(false)
            if(res.success){
                setNewMessage(res.message)
                setUserData(res.data)
                setRefresh(refresh?false:true)
                navigate('/myconcerns')
            }else{
                setNewMessage("server Error")
            }
        }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    }
return (
    <>
    {loading&&<Loading/>}
    <div className='add-concern'>
        <div className="title-cover"></div>
        <div className="card-title"><h2>{props.data.title}</h2></div>
        <div className="form-body">
        <div className="input-wrapper">
            <input className="input-box" type="text" placeholder='concern' onChange={(e)=>{setConcern({...concern,title:e.target.value})}}/>
            <span className="underline"></span>
        </div>
        <div class="input-wrapper">
            <input className="input-box" type="text" placeholder="Description"  onChange={(e)=>{setConcern({...concern,description:e.target.value})}}/>
            <span className="underline"></span>
        </div>
            <select name="" id="dropdown" onChange={(e)=>{setConcern({...concern,block:e.target.value})}}>
                <option value="1">CSE</option>
                <option value="2">ECE</option>
                <option value="3">EEE</option>
                <option value="4">ME</option>
                <option value="5">MBA</option>
                <option value="6">BSH</option>
                <option value="7">Pharmacy</option>
                <option value="8">polytechnic</option>
            </select>
        <div className="input-wrapper">
            <input className="input-box" type="text" placeholder="Location"  onChange={(e)=>{setConcern({...concern,location:e.target.value})}}/>
            <span className="underline"></span>
        </div>
        <div className="input-wrapper">
            <label htmlFor="public">Public</label>
            <input name='public' defaultChecked type="checkbox" value={concern.public?false:true} onChange={(e)=>{setConcern({...concern,public:e.target.value})}}/>
        </div>
            <label className="file-upload" for="file">
                <input type="file" id="file" multiple={false} onChange={(e)=>{setConcern({...concern,images:e.target.files})}}/>
            </label>
        </div>
        <button className='submit' onClick={handleSubmit}>submit</button>
    </div>
    </>
)
}

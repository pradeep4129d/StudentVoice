import React, { useState } from 'react'
import useStore from '../src/store/Store'
import { Loading } from './Loading'
import { useNavigate } from 'react-router-dom'

export const AddConcern = () => {
    const [concern,setConcern]=useState({title:'',description:'',block:'1',location:'',images:[]})
    const [loading,setloading]=useState(false)
    const {setNewMessage}=useStore()
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
            const response = await fetch('http://localhost:3000/addconcern', {
            method: 'PUT',
            headers:{'authorization':token.token},
            body:formdata
        });
        const res=await response.json()
        console.log(res)
        if(res){
            setloading(false)
            if(res.success){
                setNewMessage('added successfully')
                navigate('/myconcerns')
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
        <div className="card-title"><h2>New Concern</h2></div>
        <div className="form-body">
        <div class="input-wrapper">
            <input class="input-box" type="text" placeholder="Concern" onChange={(e)=>{setConcern({...concern,title:e.target.value})}}/>
            <span class="underline"></span>
        </div>
        <div class="input-wrapper">
            <input class="input-box" type="text" placeholder="Description" onChange={(e)=>{setConcern({...concern,description:e.target.value})}}/>
            <span class="underline"></span>
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
        <div class="input-wrapper">
            <input class="input-box" type="text" placeholder="Location" onChange={(e)=>{setConcern({...concern,location:e.target.value})}}/>
            <span class="underline"></span>
        </div>
            <label class="file-upload" for="file">
                <input type="file" id="file" multiple onChange={(e)=>{setConcern({...concern,images:e.target.files})}}/>
            </label>
        </div>
        <button className='submit' onClick={handleSubmit}>submit</button>
    </div>
    </>
)
}

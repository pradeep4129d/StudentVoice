import React, { useEffect, useState } from 'react'
import useStore from '../src/store/Store'

export const Message = () => {
    const {message,setNewMessage}=useStore()
    const [classname,setclassname]=useState('')
    useEffect(()=>{
        if(message===''){
            setclassname('hide')
        }
        else{
            setclassname('start')
            setTimeout(() => {
                setclassname('hide')
                setNewMessage('')
            }, 3000);
        }
    },[message])
return (
    <div className={'message '+classname}>
        <div className="message-container">
            <p>{message}</p>
        </div>
    </div>
)
}

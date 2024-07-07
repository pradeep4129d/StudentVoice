import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Header from '../components/Header.jsx'
import App from './App.jsx'
import './index.css'
import { Context } from './store/Store.jsx'
import { Message } from '../components/Message.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Context>
    <div className="pub-logo">
    <img className='logo-img2' src="https://res.cloudinary.com/dutz70yxy/image/upload/v1718868807/Untitled_bqqfsq.png" alt="" />
    <span className='m-title'>Student Voice</span>
    </div>  
    <Header/>
    <App />
    <Message/>
    </Context>
    </BrowserRouter>
  </React.StrictMode>
)

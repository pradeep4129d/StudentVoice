import React, { useRef, useState ,useEffect} from 'react'
import { Link} from 'react-router-dom'

const Header = () => {
    const [classname2,setclassname2]=useState(['t','f','f','f','f']);
    const curveref=useRef(null)
    const tabref=useRef(null)
    useEffect(() => {
        if (tabref.current) {
        tabref.current.click();
        }
    }, []);
return (
    <div className='header'>
        <div className='logo'>
        <img className='logo-img' src="https://res.cloudinary.com/dutz70yxy/image/upload/v1718868807/Untitled_bqqfsq.png" alt="" />
        <div className="title">Student Voice</div>
        </div>
        <nav className="tabs">
            <Link to='/' ref={tabref} className={'tab '+classname2[0]} onClick={(event)=>{setclassname2(['t','f','f','f','f'])
                const element=event.target;
                const rect=element.getBoundingClientRect()
                curveref.current.style.left=`${rect.left-19.4}px`;
            }}><ion-icon name="globe-outline"></ion-icon><span className="tab-names">All Concerns</span> </Link>
            <Link to='/myconcerns' className={'tab '+classname2[1]} onClick={(event)=>{setclassname2(['f','t','f','f','f'])
                const element=event.target;
                const rect=element.getBoundingClientRect()
                curveref.current.style.left=`${rect.left-19.4}px`;
            }}><ion-icon name="duplicate-outline"></ion-icon><span className="tab-names"> My Issues</span></Link>
            <Link to='/solved' className={'tab '+classname2[3]} onClick={(event)=>{setclassname2(['f','f','f','t','f'])
                const element=event.target;
                const rect=element.getBoundingClientRect()
                curveref.current.style.left=`${rect.left-19.4}px`;
            }}><ion-icon name="checkbox-outline"></ion-icon><span className="tab-names"> Solved</span></Link>
            <Link to='/profile' className={'tab '+classname2[4]} onClick={(event)=>{setclassname2(['f','f','f','f','t'])
                const element=event.target;
                const rect=element.getBoundingClientRect()
                curveref.current.style.left=`${rect.left-19.4}px`;
            }}><ion-icon name="person-outline"></ion-icon><span className="tab-names"> Profile</span></Link>
        </nav>
        <div ref={curveref} className={'curve'}>
            <div className="cover"></div>
            <div className="left-curve"></div>
            <div className="center"></div>
            <div className="right-curve"></div>
            <div className="ball"></div>
        </div>
    </div>
)
}

export default Header
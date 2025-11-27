import './App.css';
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext, UserInfoIntervalContext } from './App.js';
import {LoadingSpinner} from './components/LoadingSpinner.js';


export function Layout() {
    const [isLoading, setIsLoading] = useState(false);

    const {userInfo, setUserInfo} = useContext(UserContext);
    const {userInfoInterval, sendUserInfo, startSendingUserInfo, stopSendingUserInfo} = useContext(UserInfoIntervalContext);
    const navigate = useNavigate();
    const email = userInfo?.email;
    console.log(email);//testing
    console.log(userInfo);//testing
    const isAdmin = userInfo.email=='admin@gmail.com';


    async function handleLogout(){
      
      try{
        // await sendUserInfo(userInfo);
        const customer = await fetch(`http://localhost:4000/api/particularcustomer`,{
            method:'POST',
            // credentials:'include',
            body: JSON.stringify(userInfo),
            headers: {'Content-Type': 'application/json'},
        });
        stopSendingUserInfo();
        console.log(userInfo);

        fetch("http://localhost:4000/api/logout",{
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo('');
        navigate('/login');
      }
      catch (error) {
        console.error('Error during logout:', error);
      }
    }

    useEffect(() => {
        return () => {
          stopSendingUserInfo(); // Clean up the interval on unmount
        };
      }, []);
    
  

    return (
        <main>
            <header>
                <Link to={(userInfo.email==='admin@gmail.com')? "/admin" : ""} className="header-logo">ELITE FOOTWEAR</Link>
                <nav>
                    
                    {email &&
                        <Link to="/" className="log-out" onClick={handleLogout}>
                            Log out
                        </Link>
                    }
                    
                    {!email &&
                    <>
                        <Link to="/login" className='icon-link'>
                            {/* Log In */}
                            <svg fill="#000000" width="17px" height="17px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-login"><path d="M5 1H17V2H18V20H17V21H5V20H4V14H6V19H16V3H6V8H4V2H5V1M8 6H10V7H11V8H12V9H13V10H14V12H13V13H12V14H11V15H10V16H8V14H9V13H10V12H2V10H10V9H9V8H8V6Z" /></svg>
                        </Link>
                        <Link to="/register" className="icon-link"/*style={{display:'flex', alignItems:'center', justifyContent:'center'}}*/>
                            {/* Sign Up */}
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="#0D0D0D"/></svg>
                        </Link>
                    </>
                    }
                    
                    
                    <Link to={(isAdmin)? "/admin":""} className='icon-link'>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333-6 5.333zM13 19v-4h-2v4h2z" fill="#0D0D0D"/></svg>
                    </Link>
                    <Link to="/shop" className='icon-link'>
                        {/* Shop */}
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>search</title><path d="M416 448L319 351Q277 383 224 383 181 383 144 362 107 340 86 303 64 266 64 223 64 180 86 143 107 106 144 85 181 63 224 63 267 63 304 85 341 106 363 143 384 180 384 223 384 277 351 319L448 416 416 448ZM223 336Q270 336 303 303 335 270 335 224 335 177 303 145 270 112 223 112 177 112 144 145 111 177 111 224 111 270 144 303 177 336 223 336Z" /></svg>
                    </Link>
                    <Link to="/about" className='icon-link'>
                        {/* About */}
                        <svg width="17px" height="17px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m 8 0 c -4.410156 0 -8 3.589844 -8 8 s 3.589844 8 8 8 s 8 -3.589844 8 -8 s -3.589844 -8 -8 -8 z m 0 2 c 3.332031 0 6 2.667969 6 6 s -2.667969 6 -6 6 s -6 -2.667969 -6 -6 s 2.667969 -6 6 -6 z m 0 1.875 c -0.621094 0 -1.125 0.503906 -1.125 1.125 s 0.503906 1.125 1.125 1.125 s 1.125 -0.503906 1.125 -1.125 s -0.503906 -1.125 -1.125 -1.125 z m -1.523438 3.125 c -0.265624 0.011719 -0.476562 0.230469 -0.476562 0.5 c 0 0.277344 0.222656 0.5 0.5 0.5 h 0.5 v 3 h -0.5 c -0.277344 0 -0.5 0.222656 -0.5 0.5 s 0.222656 0.5 0.5 0.5 h 3 c 0.277344 0 0.5 -0.222656 0.5 -0.5 s -0.222656 -0.5 -0.5 -0.5 h -0.5 v -4 h -2.5 c -0.007812 0 -0.015625 0 -0.023438 0 z m 0 0" fill="#2e3436"/>
                        </svg>
                    </Link>
                    {(email && !isAdmin) &&
                    <>
                        <Link to="/contactus" className='icon-link'>
                            {/* Contact */}
                            <svg 
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path d="M19 22H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2z" />
                            <line x1="16" y1="2" x2="16" y2="4" />
                            <line x1="8" y1="2" x2="8" y2="4" />
                            <circle cx="12" cy="11" r="3" />
                            <path d="M17 18.5c-1.4-1-3.1-1.5-5-1.5s-3.6.6-5 1.5" />
                            </svg>
                        </Link>
                        <Link to="/favorites" className='icon-link'>
                            {/* <>Favorites</> */}
                            <svg fill="#000000" width="21px" height="21px" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart"><path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/></svg>
                        </Link>
                        <Link to="/viewcart" className='icon-link'>
                            {/* <>View Cart</> */}
                            <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.7351 14.0181C8.91085 13.6985 9.24662 13.5 9.61132 13.5H16.47C17.22 13.5 17.88 13.09 18.22 12.47L21.6008 6.33041C21.7106 6.13097 21.7448 5.91025 21.7129 5.70131C21.8904 5.52082 22 5.27321 22 5C22 4.44772 21.5523 4 21 4H6C5.96703 4 5.93443 4.0016 5.90228 4.00471L5.7317 3.64435C5.40095 2.94557 4.69708 2.5 3.92398 2.5H2.92004C2.36776 2.5 1.92004 2.94772 1.92004 3.5C1.92004 4.05228 2.36776 4.5 2.92004 4.5H3.14518C3.6184 4.5 4.04931 4.77254 4.25211 5.20011L7.08022 11.1627C7.35632 11.7448 7.33509 12.4243 7.02318 12.988L6.17004 14.53C5.44004 15.87 6.40004 17.5 7.92004 17.5H18.92C19.4723 17.5 19.92 17.0523 19.92 16.5C19.92 15.9477 19.4723 15.5 18.92 15.5H9.61131C8.85071 15.5 8.36855 14.6845 8.7351 14.0181ZM17.0408 10.4677L19.5108 6H6.84671L8.90839 10.3557C9.23914 11.0544 9.94301 11.5 10.7161 11.5H15.2905C16.0183 11.5 16.6886 11.1046 17.0408 10.4677Z" fill="#000000"/>
                            <path d="M7.92005 18.5C6.82005 18.5 5.93005 19.4 5.93005 20.5C5.93005 21.6 6.82005 22.5 7.92005 22.5C9.02005 22.5 9.92005 21.6 9.92005 20.5C9.92005 19.4 9.02005 18.5 7.92005 18.5Z" fill="#000000"/>
                            <path d="M17.9201 18.5C16.8201 18.5 15.9301 19.4 15.9301 20.5C15.9301 21.6 16.8201 22.5 17.9201 22.5C19.0201 22.5 19.9201 21.6 19.9201 20.5C19.9201 19.4 19.0201 18.5 17.9201 18.5Z" fill="#000000"/>
                            </svg>
                        </Link>
                    </>
                    }
                    
                   
                </nav>
            </header>
            
            {isLoading && <LoadingSpinner/>}
            <div className='outer-container'>
                <Outlet />
            </div>
        </main>
    );
}

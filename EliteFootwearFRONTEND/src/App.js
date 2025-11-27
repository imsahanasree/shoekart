import { Routes, Route, useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';
import './App.css';
import { Layout } from './Layout.js';
import { IndexPage } from './pages/IndexPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import { ShoePage } from './pages/ShoePage.js';
import ShopPage from './pages/ShopPage.js';
import { createContext, useState } from 'react';
import AboutPage from './pages/AboutPage.js';
import ContactPage from './pages/ContactPage.js';
import CartPage from './pages/CartPage.js';
import FavoritesPage from './pages/FavoritesPage.js';
import { MainPage } from './AdminPages/MainPage.js';
import { AllCustomers } from './AdminPages/AllCustomers.js';
import { AllOrders } from './AdminPages/AllOrders.js';
import { AddItemPage } from './AdminPages/AddItemPage.js';
import { DelItemPage } from './AdminPages/DelItemPage.js';
import {ShowPopPage} from './AdminPages/ShowPopPage.js'
import toast from 'react-hot-toast';
import { UpdateItemPage } from './AdminPages/UpdateItemPage.js';
import { LoadingSpinner } from './components/LoadingSpinner.js';


export const UserContext = createContext();
export const UserInfoIntervalContext = createContext();


function App() {
  let userInfoInterval;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //function to obtain cookie value
  function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie starts with the provided cookieName
      if (cookie.startsWith(cookieName + '=')) {
        // Return the value of the cookie
        return cookie.substring(cookieName.length + 1);
      }
    }
    // Return null if cookie not found
    return null;
  }

  //check if session is still valid
  useEffect(() => {
    const myCookieValue = getCookie('token');
    if (myCookieValue === null || myCookieValue === '') return;

    fetch("http://localhost:4000/api/profile", {
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Session expired...login again`);
        }
        return response.json();
    })
    .then(userInfo => {
        setUserInfo(userInfo);
        navigate(userInfo.email === 'admin@gmail.com' ? "/admin" : "/");
        startSendingUserInfo(userInfo);
    })
    .catch(error => {
        console.log('Error fetching profile:', error);
        toast.error(`Error: ${error.message}`);
        navigate("/login");
    });
}, []);


  // Function to send user information to the server
const sendUserInfo = async (userInfo) => {
  try {
    await fetch('http://localhost:4000/api/particularcustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
  } catch (error) {
    console.error('Error sending user info:', error);
  }
};

// Start sending user info at regular intervals
const startSendingUserInfo = (userInfo) => {
  // Send user info every 5 minutes (300000 milliseconds)
  userInfoInterval = setInterval(() => {
    sendUserInfo(userInfo);
  }, 300000);
};

  // Stop sending user info
const stopSendingUserInfo = () => {
    if (userInfoInterval) {
    clearInterval(userInfoInterval);
    }
};

  const [userInfo, setUserInfo] = useState({});

  return (
    <>
    {isLoading && <LoadingSpinner/>}
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <UserInfoIntervalContext.Provider value={{userInfoInterval, sendUserInfo, startSendingUserInfo, stopSendingUserInfo}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/shoe-page/:id' element={<ShoePage />} />
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contactus' element={<ContactPage/>} />
          <Route path='/viewcart' element={<CartPage/>} />
          <Route path='/favorites' element={<FavoritesPage/>} />
          {/* <Route path='/admin' element={<MainPage/>} /> */}
          { userInfo.email==='admin@gmail.com' &&
            <Route path="/admin" element={<MainPage/>}>
              <Route index element={<AllCustomers/>}/>
              <Route path='all-cust' element={<AllCustomers/>} />
              <Route path='all-orders' element={<AllOrders/>} />
              <Route path='add-item' element={<AddItemPage/>} />
              <Route path='upd-item' element={<UpdateItemPage/>} />
              <Route path='del-item' element={<DelItemPage/>} />
              <Route path='show-pop' element={<ShowPopPage/>} />
            </Route>
          }
    
    </Route>
      </Routes>
      </UserInfoIntervalContext.Provider>
    </UserContext.Provider>
    </>
  );
}

export default App;

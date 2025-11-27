import { useEffect, useState, useContext } from "react";
import {UserContext} from "../App.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";
import toast from "react-hot-toast";


export default function CartPage(){
    const [isLoading, setIsLoading] = useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [cartShoes, setCartShoes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    console.log('in cart page');
    console.log(userInfo);
    
    function getCurrentDate(days=5, separator=''){
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    //close the popup
    const handleClosePopup = async() => {
        setShowPopup(false);
        //empty cart

        // const message = `Dear ${userInfo.name? userInfo.name : 'Customer'}, \nYou have successfully placed an order at Elite Footwear. \nHere's your order details: \n${cartShoes.map((shoe, index)=>{
        //     return `${index+1}. ${shoe.name}, size:${userInfo.selectedSize[index]}\n`;
        // })}total order amount = ${cartShoes.reduce((total, shoe) => total + shoe.price, 0)} \nRegards, \nTeam Elite Footwear`;
        
        setUserInfo({
            name:userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            password:userInfo.password,
            cart:[],
            favorites:userInfo.favorites,
            selectedSize: userInfo.selectedSize,
            quantity: userInfo.quantity
        });

        // await fetch("http://localhost:4000/api/send-email", {
        //     method:'POST',
        //     body: JSON.stringify({
        //         email: userInfo.email,
        //         subject: 'Order Placed!',
        //         message: message
        //     }),
        //     headers: {'Content-type': 'application/json'}
        // }).then(response =>{
        //     response.json().then(response=>{
        //         console.log(response);
        //     });
        // });

        // Navigate to index page or perform any other action
        navigate("/");// Navigate to the index page
    };


    function DecQuantity(index){
        let tempCart = [...userInfo.cart];
        let tempSize = [...userInfo.selectedSize];
        let tempQuantity = [...userInfo.quantity];
        
        if (--tempQuantity[index]===0){
            tempCart.splice(index,1);
            tempSize.splice(index,1);
            tempQuantity.splice(index,1);
        }
        setUserInfo({
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            phone: userInfo.phone,
            favorites: userInfo.favorites,
            cart: tempCart,
            selectedSize: tempSize,
            quantity: tempQuantity
        })
    }

    function IncQuantity(index){
        let tempQuantity = [...userInfo.quantity];
        tempQuantity[index]++;
        
        setUserInfo({
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            phone: userInfo.phone,
            favorites: userInfo.favorites,
            cart: userInfo.cart,
            selectedSize: userInfo.selectedSize,
            quantity: tempQuantity
        });
    }



    useEffect(()=>{
        if (!userInfo || !userInfo.email) {
            setRedirect(true);
            return;
        }
        fetch("http://localhost:4000/api/customer/getcart",{
            method: 'POST',
            body: JSON.stringify(userInfo.cart),
            headers: {'Content-Type': 'application/json'},
            // credentials: 'include'
        }).then(response =>{
            response.json().then(cartShoes => {
                setCartShoes(cartShoes);
            });
        })
    }, [userInfo]);


    if (redirect){
        return <Navigate to="/login" />;
    }
    // console.log(cartShoes);


    async function placeOrder(){
        setIsLoading(true);
        await fetch("http://localhost:4000/api/placeorder",{
            method:'POST',
            body: JSON.stringify({
                                    name: userInfo.name,
                                    phone: userInfo.phone,
                                    email: userInfo.email,
                                    shoes: cartShoes,
                                    selectedSize: userInfo.selectedSize,
                                    quantity: userInfo.quantity,
                                    order_amt : cartShoes.reduce((total, shoe) => total + shoe.price, 0),
                                    order_date: getCurrentDate(0,'-'),
                                    delv_date: getCurrentDate(5,'-')
                                }),
            headers: {'Content-Type': 'application/json'},
            // credentials: 'include'
        }).then(response=>{
            if (response.ok){
                console.log('placed order successfuly');
                console.log(response);
                setShowPopup(true);
            }
            else{
                toast.error('Could not place order')
            }
            setIsLoading(false);
        });
    }

    function getAmt(){
        let total = 0;
        for (let i=0; i<cartShoes.length; i++){
            total += cartShoes[i].price*userInfo.quantity[i];
        }
        return total;
    }

    
    return (
        <>
            <h1 style={{fontFamily:'nike-font', marginTop:'100px', textAlign:'center'}}>YOUR CART</h1>
            
            <div  className="cart-container">
                {cartShoes.length>0? (cartShoes.map((shoe,index) => 
                    <div key={`${shoe._id}${userInfo.selectedSize[index]}`} className="cart-list-item">
                        <img src={shoe.photos[0].url}/>

                        <div style={{borderRadius:'7px', alignItems:'center',justifyContent:'center',display:'flex', flexDirection:'column'/*,textAlign:'center'*/, fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>
                            <div>Product: {shoe.name}</div>
                            <div style={{fontSize:'0.8rem'}}>Size: {userInfo.selectedSize[index]}</div>
                        </div>

                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}> ₹{shoe.price*userInfo.quantity[index]}</div>

                        <div className="inc-dec-button" style={{display:'grid', gridTemplateColumns:'20px 20px 20px', backgroundColor:'#ccc', height:'20px', borderRadius:'5px', margin:'auto 0'}}>
                            <button style={{display:'flex', justifyContent:'center', textAlign:'center',alignItems:'center',width:'20px', height:'20px', backgroundColor:/*'#FF033E'*/'black', color:'white', borderRadius:'5px', cursor:'pointer', fontSize:'14px', fontWeight:'bold'}} onClick={(ev)=>{DecQuantity(index)}}>-</button>
                            <div style={{textAlign:'center', width:'20px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>{userInfo.quantity[index]}</div>
                            <button style={{display:'flex', textAlign:'center', justifyContent:'center',alignItems:'center',width:'20px', height:'20px', fontSize:'14px', fontWeight:'bold',backgroundColor:/*'#32de84'*/'black', color:'white', borderRadius:'5px', cursor:'pointer'}} onClick={(ev)=>{IncQuantity(index)}}>+</button>
                        </div>

                    </div>
                )) : (
                    <div className="empty-cart">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="Empty Cart" />
                        <div style={{textAlign:'center', fontFamily:'regular-font'}}>Your cart is empty</div>
                    </div>
            )}

            </div>

            {cartShoes.length>0 &&
                <div className="cart-amt-details">
                    <span style={{fontFamily:'nike-font', fontSize:'1.2rem', marginRight:'15px'}}>ORDER DATE:  </span> <span style={{fontFamily:'regular-font'}}>{getCurrentDate(0,'-')}</span><br/><br/>
                    <span style={{fontFamily:'nike-font', fontSize:'1.2rem', marginRight:'15px'}}>DELIVERY DATE:  </span> <span style={{fontFamily:'regular-font'}}>{getCurrentDate(5,'-')}</span><br/><br/>
                    
                    <span style={{fontFamily:'nike-font', fontSize:'1.2rem', marginRight:'15px'}}>TOTAL ORDER AMOUNT:  </span>
                    <span style={{ fontFamily: 'regular-font' }}>
                        ₹{getAmt()}
                    </span>

                    <button style={{width:'50%', height:'35px', borderRadius:'14px',padding:'0', border:'none',backgroundColor:'black',color:'white', fontFamily:'nike-font', marginTop:'35px', marginLeft:'25%', display:'flex', alignItems:'center', textAlign:'center', justifyContent:'center', cursor:'pointer'}} onClick={placeOrder}>PLACE ORDER</button>
                    
                </div>
            }

            {showPopup && <Popup msg={'🎉Order successfully placed!🎉'} onClose={handleClosePopup} />}

            {isLoading && <LoadingSpinner/>}

        </>
    );
}

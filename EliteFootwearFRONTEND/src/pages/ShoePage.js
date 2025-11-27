import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {UserContext} from "../App.js";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../components/LoadingSpinner.js";

export function ShoePage(){
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);

    //used to navigate which shoe thumbnail to see
    const [index, setIndex] = useState(0);
    const {userInfo, setUserInfo} = useContext(UserContext);
    //state variable to store size of selection
    const [shoeSize, setShoeSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [shoe, setShoe] = useState(null);

    const [isInCart, setIsInCart] = useState(IfShoeInCart());

   

    //testing
    useEffect(()=>{console.log(shoeSize)}, [shoeSize]);

    useEffect(() => {
        setIsInCart(IfShoeInCart()); // Update state whenever userInfo changes
    }, [userInfo, shoeSize]);

    function incrementImg(){
        setIndex((index+1)%shoe.photos.length);
    }
    function decrementImg(){
        if (index===0) setIndex(shoe.photos.length-1);
        else setIndex(index-1);
    }
    function handleMouseHover(e){
        setIndex((isNaN(parseInt(e.target.id)) ? 0 : parseInt(e.target.id)));
    }
    function setShoeSizeHelper(ev,size){
        if (size !== shoeSize) setQuantity(1);
        setShoeSize(size);
        ev.target.style.backgroundColor = '#f0f0f0';
        const buttons = document.querySelectorAll('.size-card button');
        buttons.forEach(button =>{
            if (button !== ev.target){
                button.style.backgroundColor = 'white';
                button.style.color = 'black';
            }
        });
    }
    function IfShoeInCart(){
        if (!userInfo || !userInfo.cart) return;
        for (let i=0; i<userInfo.cart.length; i++){
            if (userInfo.cart[i]===id && userInfo.selectedSize[i]===shoeSize){
                return true;
            }
        }
        return false;
    }

    //testing
    useEffect(()=>{console.log(IfShoeInCart())}, []);

    function addToCartOnClick(ev){
        if (!userInfo || userInfo==='' || !userInfo.email|| userInfo.email===""){
        // toast.error('You must sign in first!', {
        //     position: "top-center",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: 0,
        //     theme: "dark",
        //     transition: Bounce,
        //     });
            toast.error('You must sign in first!');
        }
        else{
            if (IfShoeInCart()){
                ev.target.style.backgroundColor = 'black';
                ev.target.style.color = 'white';
                // ev.target.innerText = 'Add to Cart';
                let tempCart = [...userInfo.cart];
                let tempSize = [...userInfo.selectedSize];
                let tempQuantity = [...userInfo.quantity];
                //remove the shoe and corresponding size
                for (let i=0; i<tempCart.length; i++){
                    if (tempCart[i]===id && tempSize[i]===shoeSize){
                        tempCart.splice(i,1);
                        tempSize.splice(i,1);
                        tempQuantity.splice(i,1);
                        break;
                    }
                }
                setUserInfo({
                    name: userInfo.name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    password: userInfo.password,
                    cart: tempCart,
                    favorites: userInfo.favorites,
                    selectedSize: tempSize,
                    quantity: tempQuantity
                });
                console.log('after removing from cart...');
                console.log(userInfo);
            }
            else{
                if (shoeSize===""){
                    // toast.warn('Choose a shoe size!', {
                    //     position: "top-center",
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: 0,
                    //     theme: "dark",
                    //     transition: Bounce,
                    //     });
                        toast.error('Choose a shoe size!');
                    return;
                }
                setIsInCart(IfShoeInCart());
                ev.target.style.backgroundColor = '#FF033E';
                ev.target.style.color = 'white';
                // ev.target.innerText = 'Remove from Cart';
                let tempCart = [...userInfo.cart];
                let tempSize = [...userInfo.selectedSize];
                let tempQuantity = [...userInfo.quantity];
                tempCart.push(id);
                tempSize.push(shoeSize);
                tempQuantity.push(1);

                setUserInfo({
                    name: userInfo.name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    password: userInfo.password,
                    cart: tempCart,
                    favorites: userInfo.favorites,
                    selectedSize: tempSize,
                    quantity: tempQuantity
                });
                console.log('after adding to cart...');
                console.log(userInfo);
            }  
            setIsInCart(IfShoeInCart());
        }
    }
    function addToFavoritesOnClick(ev){
        if (!userInfo || userInfo==='' || !userInfo.email|| userInfo.email==="")
            // toast.error('You must sign in first!', {
            //     position: "top-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: 0,
            //     theme: "dark",
            //     transition: Bounce,
            //     });
                toast.error('You must sign in first!');
        else{
            if (ev.target.innerText==='Remove from Favorites'){
                ev.target.innerText = 'Add to Favorites';
                let tempFav = [...userInfo.favorites];
                tempFav.splice(tempFav.indexOf(id), 1);
                setUserInfo({
                    name: userInfo.name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    password: userInfo.password,
                    cart: userInfo.cart,
                    favorites: tempFav,
                    selectedSize: userInfo.selectedSize,
                    quantity: userInfo.quantity
                });
                console.log('after removing to favorites...');
                console.log(userInfo);
            }
            else{
                ev.target.innerText = 'Remove from Favorites';
                let tempFav = (userInfo.favorites && userInfo.favorites.length>0)? [...userInfo.favorites] : [];
                tempFav.push(id);
                setUserInfo({
                    name: userInfo.name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    password: userInfo.password,
                    cart: userInfo.cart,
                    favorites: tempFav,
                    selectedSize: userInfo.selectedSize,
                    quantity: userInfo.quantity
                });
                console.log('after adding to favorites...');
                console.log(userInfo);
            }
            
        }
    }
    


    // this is done to find the shoe by id from server
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:4000/api/product/${id}`)
            .then(response => {
                response.json().then(shoeInfo => {
                    setShoe(shoeInfo);
                    console.log(shoe);
                    setIsLoading(false);
                });
            }).catch(error=>{
                setIsLoading(false);
                toast.error(`An unknown error occurred when reaching the server: ${error}`);
            });
    }, [id]);


    if (!shoe /*|| !userInfo*/){
        return(
            <LoadingSpinner/>
        );
    }

    return (
        <>
            <div className="shoe-page-outer-grid">

                <div /*key={id} */className="shoe-page-photos">
                    {shoe.photos.length>0 && shoe.photos.map((shoeImgPath, index) => 
                        <img /*key={shoeImgPath}*/ className="shoe-thumbnail" id={`${id}${shoeImgPath}${index}`} onMouseOver={handleMouseHover} src={shoeImgPath.url} alt='shoe-thumbnail'/>
                    )}
                </div>

                <div /*key={id}*/ className="shoe-page-left">
                        <img className="shoe-large-thumbnail" src={shoe.photos[index].url} alt="large-shoe-thumbnail" />
                        <button style={{width:'30px', height:'30px', borderRadius:'50%', zIndex:'1', position:'absolute', bottom: '25px', right: '70px', backgroundColor:'white', border:'none',fontWeight:'bold', cursor:'pointer', textAlign:'center'}} onClick={decrementImg}>{`<`}</button>
                        <button style={{width:'30px', height:'30px', borderRadius:'50%', zIndex:'2', position:'absolute', bottom: '25px', right:'35px', backgroundColor:'white', border:'none',fontWeight:'bold', cursor:'pointer', textAlign:'center'}} onClick={incrementImg}>{`>`}</button>
                </div>

                <div /*key={id}*/ className="shoe-page-right">
                    <div /*key={id}*/ className="topdiv">
                        <div style={{fontWeight:'bold', fontSize:'1.5rem'}}>{shoe.name}<br/></div>
                        <>{shoe.category}<br/></>
                        {(userInfo.email==='admin@gmail.com') && <div style={{color:'##FF033E'}}>shoe id: {shoe._id}<br/></div>}
                        <div style={{marginTop:'30px'}}> ₹{shoe.price}<br/></div>
                        <div style={{marginTop:'30px'}}>Select Size</div>
                        <div /*key={id}*/ className="size-cards-divs">
                        {shoe.sizes.length>0 && shoe.sizes.map((size, idx) =>
                            <div className="size-card" /*key={`${id}:${idx}`}*/>
                                <button /*key={`${id}:${idx}`}*/ onClick={(ev)=>{setShoeSizeHelper(ev,size)}}>
                                    {size}
                                </button>
                            </div>
                        )}
                        </div>
                    </div>

                    <br/>
                    <div className="bottomdiv" dangerouslySetInnerHTML={{ __html:shoe.description }}>
                        {/* {shoe.description} */}
                    </div>
                    
                        <button /*key={id}*/ className="add-button" style={{ width: '100%', backgroundColor: isInCart? '#FF033E':'black', borderRadius: '15px', outline: 'none', color: isInCart? 'black' : 'white', borderColor: 'rgb(212, 212, 212)', margin: '0', padding: '0', height: '45px', marginTop: '30px', fontFamily: 'regular-font', fontSize: '1rem', cursor: 'pointer' }} onClick={(ev)=>{addToCartOnClick(ev)}}>
                            {isInCart? <>Remove from Cart</> : <>Add to Cart</>}
                        </button>
                        <button /*key={id}*/ className="fav-button" style={{ width: '100%', backgroundColor: (!userInfo  || !userInfo.favorites|| !userInfo.favorites.includes(id)) ? 'white' : '#FF033E', borderRadius: '15px', outline: 'none', color: 'black', borderColor: 'rgb(212, 212, 212)', margin: '0', padding: '0', height: '45px', marginTop: '30px', fontFamily: 'regular-font', fontSize: '1rem', cursor: 'pointer' }} onClick={(ev) => { addToFavoritesOnClick(ev) }}>
                            {(!userInfo || !userInfo.favorites|| !userInfo.favorites.includes(id) )? <>Add to Favorites</> : <>Remove from Favorites</>}
                        </button>
                    

                </div>

            </div>
        </>

    );
}
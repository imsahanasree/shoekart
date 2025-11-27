import { useEffect, useState } from "react";
import { ShoeCard } from './ShoeCard.js';
import toast from "react-hot-toast";
import { LoadingSpinner } from "../components/LoadingSpinner.js";


export function IndexPage() {
    const [shoes, setShoes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{
        setIsLoading(true);
        fetch("http://localhost:4000/api/products").then(response =>{
                response.json().then(shoesFromServer =>{
                    setShoes(shoesFromServer);
                    setIsLoading(false);
                });
            }).catch(error => {
                setIsLoading(false);
                toast(
                `An error occurred while fetching shoes:\n${error}`,
                {
                  duration: 5000,
                })
            });
    }, []);

    

    return (
        <>
            <div className="index-page-top-section">
                <img className="index-page-img" src={'https://img.freepik.com/premium-photo/3d-rendering-sports-shoe-gray-background-with-shadow_890746-3302.jpg'} alt='shoe'/>
            </div>

    

            <p style={{ textAlign: 'center' }}>
                <span className="index-msg" >BROWSE THE RANGE</span>
                <br />
                Discover the boundless limits of handcrafted luxury shoes
            </p>
            <div className="shoe-card-container">
                {(shoes && shoes.length > 0)? (shoes.map(shoe =>
                    <ShoeCard key={shoe._id} shoe={shoe} />
                )) : (
                    <div className="empty-cart">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="No Favorites" />
                        <div style={{textAlign:'center', fontFamily:'regular-font'}}>Add Items to Favorites</div>
                    </div>
                )}
            </div>

            {isLoading && <LoadingSpinner/>}

        </>
    );
}

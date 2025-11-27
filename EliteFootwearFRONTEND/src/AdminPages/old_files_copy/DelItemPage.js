import { useEffect, useState } from 'react';
import {ShopPage} from '../pages/ShopPage';
import { ShoeCard } from '../pages/ShoeCard';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';

export function DelItemPage(){
    const [id, setId] = useState('');
    const [shoe, setShoe] = useState(null);
    const [searching, setSearching] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showpopUp, setShowPopup] = useState(false);
    const navigate = useNavigate();

    //close the popup
    const handleClosePopup = () => {
        setShowPopup(false);
        // Navigate to index page or perform any other action
        navigate("/admin");// Navigate to the index page
    };


    useEffect(async()=>{
        await handleSearch();
    }, [id]);

    const handleSearch = async() => {
        setSearching(true);
        //get the shoe details from server
        await fetch(`http://localhost:4000/api/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setShoe(data);
                setSearching(false);
            })
            .catch((error) => {
                console.log(error);
                setSearching(false);
            });
    };


    async function deleteShoe(){
        await fetch(`https://online-shopping-shoes-backend-4.onrender.com/api/product/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Item deleting:', data);
                setShowPopup(true);                
            })
            .catch((error) => {
                console.error('Error adding item:', error);
                setSearching(false);
            });

            
    }
    


    return(
    <>
        <h1 style={{fontFamily:'nike-font', textAlign:'center', marginTop:'100px'}}>DELETE ITEM</h1>
        <div className='emailform'>

                <div className='email-form-data-input-section'>
                    <label>Shoe ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>

                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {(searching)? (
                        <>Loading...</>) : 
                    (shoe)? (
                            <ShoeCard key={shoe._id} shoe={shoe}/>
                        ) : (
                            <>Not Found</>
                        )
                    }
                </div>

                <button type="submit" className='submit-contact-form' onClick={deleteShoe}>DELETE</button>
        </div>
        {showpopUp && <Popup msg={'🎉Deleted Item!🎉'} onClose={handleClosePopup} />}
    </>
    );
}
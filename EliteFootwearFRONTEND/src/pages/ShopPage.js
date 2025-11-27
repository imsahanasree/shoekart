import { useEffect, useState } from "react";
import { ShoeCard } from "./ShoeCard";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../components/LoadingSpinner";


export default function ShopPage(){
    const [searchVal, setSearchVal] = useState('');
    const [shoes, setShoes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //by default, when the page is first loaded, fetch all shoes
    useEffect(()=>{
        setIsLoading(true);
        fetch("http://localhost:4000/api/products").
        then(response =>{
            if (!response.ok){
                throw new Error('Could not get shoes from server');
            }
            else{
                return response.json()
            }
        })
        .then(shoesFromServer =>{
            setShoes(shoesFromServer);
            setIsLoading(false);
        })
        .catch(error=>{
            toast.error(error);
            setIsLoading(false);
        });
    }, []);


    useEffect(()=>{
        if (searchVal.length>=1){
            fetch(`http://localhost:4000/api/products/search`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: searchVal })
            }).then(response=>{
                response.json().then(shoesFromServer =>{
                    setShoes(shoesFromServer);
                });
            })
            .catch(error => {
                toast(
                `An error occurred while fetching shoes:\n${error}`,
                {
                  duration: 5000,
                })
            });
        }
        else
            fetch("http://localhost:4000/api/products").then(response =>{
                response.json().then(shoesFromServer =>{
                    setShoes(shoesFromServer);
                });
            }).catch(error => {toast(
                `An error occurred while fetching shoes:\n${error}`,
                {
                  duration: 5000,
                })
            });
    }, [searchVal]);

    // if (isLoading) return (<LoadingSpinner/>);
    return (
        <>
            <div className="search-shoe">
                <div className="search-msg">{`SEARCH FOR SHOES`}</div>

                <input 
                    type="text"
                    placeholder="Search.."
                    value={searchVal}
                    style={{
                        all: 'unset',
                        width: '100%',
                        height: '38px',
                        borderRadius: '22px',
                        padding: '5px 15px',
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        outline: 'none',
                        backgroundColor:'rgb(212, 212, 212)',
                        fontWeight:'bold'
                    }}
                    onChange={(ev)=>{setSearchVal(ev.target.value)}}
                />
            </div>
            
            <div className="shoe-card-container-2">
                {shoes.length > 0? (shoes.map(shoe =>
                    <ShoeCard key={shoe.id} shoe={shoe} />
                ))
                    : ( (isLoading)? <LoadingSpinner/> :
                        <div className="empty-cart">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="Empty Cart" />
                            <div style={{textAlign:'center', fontFamily:'regular-font'}}>Couldn't Find Item</div>
                        </div>
                    )}
            </div>

            
        </>
    );
}
import { useNavigate } from "react-router-dom";

export function MainPage(){
    const navigate=useNavigate();
    const navallcust=()=>{
        navigate("/all-cust");
    };
    const navallord=()=>{
        navigate("/all-orders");
    };
    function navadditem(){
        navigate("/add-item");
    }
    function navdelitem(){
        navigate("/del-item");
    }


    return (
            <div className="adminbuttoncontainer">
                    <button className="allcust" onClick={navallcust}>View Customers</button>
                    <button className="allcust" onClick={navallord}>View Orders</button>
                    <button className="allcust" onClick={navadditem}>Add Item</button>
                    <button className="allcust" onClick={navdelitem}>Delete Item</button>
            </div>
    );


}


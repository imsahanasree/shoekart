import React, { useEffect, useState } from 'react';

export function AllOrders() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/orders')
            .then(response => response.json())
            .then(orders => {
                console.log(orders);
                setOrder(orders);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div /*className="cart-container"*/ style={{marginTop:'100px'}}>
            <h1 style={{fontFamily:'nike-font', textAlign:'center'}}>ALL ORDERS</h1>
                        <div className='ord-list-item'>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>S NO</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>NAME</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>EMAIL</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>PHONE</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>AMOUNT</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>ORDER DATE</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>DELIVERY DATE</div>
                        </div>
            {order.length>0 &&
                order.map((ord, index) => (
                    <div className='ord-list-item'>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{index+1}</div>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{ord.name? ord.name : "N/A"}</div>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{ord.email}</div>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{ord.phone}</div>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{ord.order_amt}</div>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{ord.order_date}</div>
                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{ord.delv_date}</div>
                    </div>
                ))
            }
        </div>
    );
}

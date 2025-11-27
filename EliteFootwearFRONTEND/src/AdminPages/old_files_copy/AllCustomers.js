import React, { useEffect, useState } from 'react';
import {formatISO9075} from 'date-fns';


export function AllCustomers() {
    const [cust, setCust] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/customers')
            .then(response => response.json())
            .then(customers => {
                console.log(customers);
                setCust(customers);
            })
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    return (
        <div>
            <h1 style={{fontFamily:'nike-font', textAlign:'center', marginTop:'100px'}}>ALL CUSTOMERS</h1>
            
            <div /*className="cart-container"*/>
                        <div className='cust-list-item'>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>S NO</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>NAME</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>EMAIL</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>PHONE NO</div>
                            <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'nike-font'}}>JOINED AT</div>
                        </div>
                        {cust.length > 0 &&
                            cust
                                .filter(cus => cus.email !== 'admin@gmail.com')
                                .map((cus, index) => (
                                <div className='cust-list-item' key={index}>
                                    <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{index + 1}</div>
                                    <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{cus.name ? cus.name : "N/A"}</div>
                                    <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{cus.email}</div>
                                    <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{cus.phone}</div>
                                    <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>{formatISO9075(cus.createdAt)}</div>
                                </div>
                                ))
                            }

            </div>
        </div>
    );
}

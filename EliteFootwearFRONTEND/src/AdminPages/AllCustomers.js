import React, { useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';
import { LoadingSpinner } from '../components/LoadingSpinner';


export function AllCustomers() {
  const [cust, setCust] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:4000/api/customers')
      .then(response => response.json())
      .then(customers => {
        console.log(customers);
        setCust(customers);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return (<LoadingSpinner/>);

  return (
    <div className='parent-div'>
      <div className='top-div'>
        <h1>ALL CUSTOMERS</h1>
      </div>
      <div className="container">
        
        {cust.length > 0? (
          <>
          <div className='cust-list-header'>
            <div>S NO</div>
            <div>NAME</div>
            <div>EMAIL</div>
            <div>PHONE NO</div>
            <div>JOINED AT</div>
          </div>
          {cust
            .filter(cus => cus.email !== 'admin@gmail.com')
            .map((cus, index) => (
              <div className='cust-list-item' key={index}>
                <div>{index + 1}</div>
                <div>{cus.name ? cus.name : "N/A"}</div>
                <div>{cus.email}</div>
                <div>{cus.phone}</div>
                <div>{formatISO9075(cus.createdAt)}</div>
              </div>
            ))}
            </>
        )
          : (
            <div className="empty-cart">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="No Favorites" />
              <div style={{textAlign:'center', fontFamily:'regular-font'}}>No Customers</div>
            </div>
          )}
      </div>

    

    </div>
  );
}

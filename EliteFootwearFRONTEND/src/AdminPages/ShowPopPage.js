import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';


export const ShowPopPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:4000/api/customers/fav');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPopularItems(data);
        console.log(popularItems);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchPopularItems();
  }, []);

  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 style={{ fontFamily: 'nike-font', textAlign: 'center'/*, marginTop: '100px'*/ }}>POPULAR ITEMS</h1>
      <>
        {(popularItems && popularItems.length>0)?(
          <>
            <div className='pop-header'>
              <div>S NO</div>
              <div>SHOE</div>
              <div>COUNT</div>
            </div>
            {popularItems.map((item, index) => (
            <div className="fav-item" key={item._id}>
              <div>{index+1}</div>
              <div>{item.name}</div>
              <div>{item.count}</div>
            </div>
        ))} </>
        ):( 
        <div className="empty-cart">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="No Favorites" />
          <div style={{textAlign:'center', fontFamily:'regular-font'}}>No popular items yet</div>
      </div>
        )
    }
      </>
    </div>
  );
};

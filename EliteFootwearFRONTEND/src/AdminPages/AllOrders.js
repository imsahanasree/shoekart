import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { LoadingSpinner } from '../components/LoadingSpinner';
Modal.setAppElement('#root'); // Set the root element for accessibility


export function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [shoesDetails, setShoesDetails] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    // Get all orders initially
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:4000/api/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setIsLoading(false);
            });
    }, []);


    //testing
    useEffect(() => {
        console.log(currentOrder);
    }, [currentOrder]);

    //prevent scrolling
    useEffect(() => {
        if (modalIsOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalIsOpen]);

    async function openModal(order, orderId) {
        setCurrentOrder(order);
        setModalIsOpen(true);

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:4000/api/orders/${orderId}`);
            const shoes = await response.json();
            setShoesDetails(shoes);
        } catch (error) {
            toast.error(`Error fetching shoe details: ${error}`);
        }finally{
            setIsLoading(false);
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentOrder(null);
    };

    return (
        <div className="container">
            <h1>ALL ORDERS</h1>
            <div className='ord-list-header'>
                <div>S NO</div>
                <div>NAME</div>
                <div>EMAIL</div>
                <div>PHONE</div>
                <div>AMOUNT</div>
                <div>ORDER DATE</div>
                <div>DELIVERY DATE</div>
            </div>
            {orders.length > 0 &&
                orders.map((order, index) => (
                    <div className='ord-list-item' key={order._id}>
                        <div>{index + 1}</div>
                        <div>{order.name ? order.name : "N/A"}</div>
                        <div>{order.email}</div>
                        <div>{order.phone}</div>
                        <div>{order.order_amt}</div>
                        <div>{order.order_date}</div>
                        <div>{order.delv_date}</div>
                        <div>
                            <button onClick={() => openModal(order, order._id)}>
                                v
                            </button>
                        </div>
                    </div>
                ))
            }

            {currentOrder && modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Shoes Details"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <div className="modal-header">
                        <h2>Shoes in Order</h2>
                        <button className="modal-close-button" onClick={closeModal}>x</button>
                    </div>
                    <div className='order-shoes-details'>
                        {shoesDetails.map((item, index) => (
                            <>
                            <h3>{item.shoe.name}</h3>   
                            <div key={index} className='shoe-item'>
                                {item.shoe ? (
                                    <>                    
                                            <div>{item.shoe.photos && <img src={item.shoe.photos[0]?.url} alt={item.shoe.name} style={{ width: '100px' }} />}</div>
                                            <div>
                                                <p><strong>Price: ₹{item.shoe.price}</strong></p>
                                                <p>Category: ₹{item.shoe.category}</p>
                                                <p>Size: {item.size}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                    </>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                            </>
                        ))}
                    </div>
                </Modal>
            )}

        {isLoading && <LoadingSpinner/>}

        </div>
    );
}

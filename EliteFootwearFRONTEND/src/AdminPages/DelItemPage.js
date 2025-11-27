import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';


export function DelItemPage() {
    const [isLoading, setIsLoading] = useState(false);

    const [productId, setProductId] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:4000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            });
    }, []);

    const deleteProduct = async (ev) => {
        ev.preventDefault();
        setError('');
        try {
            setIsLoading(true);
            const response = await fetch(`https://online-shopping-shoes-backend-4.onrender.com/api/product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to delete product');
            }
            toast.success('Product deleted successfully');
            setProducts(products.filter(product => product._id !== productId)); // Update the product list
            setProductId('');
        } catch (error) {
            console.error('Error deleting product:', error);
            setError(error.message || 'Error deleting product');
        } finally{
            setIsLoading(false);
        }
    };

    return (<>
        <h1>DELETE ITEM</h1>
        <form onSubmit={deleteProduct} className='emailform'>
            {error && <p className="error">{error}</p>}
            <div className='email-form-data-input-section'>
                <label>Select Product:  </label>
                <select
                    value={productId}
                    onChange={(ev) => setProductId(ev.target.value)}
                    required
                >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="submit-contact-form" disabled={isLoading}>{isLoading? "Deleting..." : "Delete Product"}</button>
            
            {isLoading && <LoadingSpinner/>}

        </form></>
    );
}

import './LoadingSpinner.css';
import React, {useEffect} from 'react';

export function LoadingSpinner(){

    useEffect(() => {
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className="loading-outer-div">
            <div className="loading-content">
                <div className="spinner-container">
                    <div className="spinner">
                        <div></div>   
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>  
                        <div></div>  
                    </div>
                </div>
                <div className="logo-temp">ELITE FOOTWEAR</div>
            </div>
        </div>
    );
}
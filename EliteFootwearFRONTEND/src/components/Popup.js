import React , {useEffect}from 'react';
import './Popup.css';

const Popup = ({msg, onClose }) => {
    
    useEffect(() => {
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);



    return (
        <div className="popup">
            <div className="popup-content">
                <h2>{msg}</h2>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Popup;

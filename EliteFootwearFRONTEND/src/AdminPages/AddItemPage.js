import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DropZone from '../components/DropBox.js';
import Popup from '../components/Popup.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner.js';


const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        ['image'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['blockquote'],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'image', 'video',
    'list', 'bullet',
    'blockquote', 'code-block',
    'script', 'indent', 'direction',
    'size', 'color', 'background'
];

export function AddItemPage() {
    const [isLoading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [sizes, setSizes] = useState(['']);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]);
    const [showpopUp, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [isFileValid, setIsFileValid] = useState(true);

    //testing
    useEffect(() => {
        console.log(files);
    }, [files]);

    //close the popup
    const handleClosePopup = () => {
        setShowPopup(false);
        // Navigate to index page or perform any other action
        navigate("/admin");// Navigate to the index page
    };


    const handleAddSize = () => {
        setSizes([...sizes, '']);
    };

    const handleSizeChange = (index, value) => {
        const newSizes = sizes.map((size, i) => (i === index ? value : size));
        setSizes(newSizes);
    };

    const handleRemoveSize = (index) => {
        if (sizes.length > 1) {
            setSizes(sizes.filter((_, i) => i !== index));
        }
    };

    function handleDescriptionChange(htmlContent){
        let s = "";
        let count = 0;
        let flag = true;
        for (let char of htmlContent) {
            if (char === '<' || char === '>') {
                if (char === '>') count = count + 1;
                if (count % 2 === 0) s += '\n';
                flag = !flag;
                continue;
            }
            if (!flag) continue;
            else {
                s = s + char;
            }
        }
        return s;
    };

    const handleValidationChange = (isValid) => {
        setIsFileValid(isValid);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (files.length === 0) {
            setIsFileValid(false);
            return;
        }
        setLoading(true);

        setIsLoading(true);

        // Convert files to Base64
        const photosBase64 = await Promise.all(files.map(file => convertToBase64(file)));

        const formData = {
            name,
            sizes,
            category,
            description:handleDescriptionChange(description),
            price,
            photos: photosBase64
        };

        fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item added:', data);
                setLoading(false);
                setShowPopup(true);

                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error adding item:', error);
                setIsLoading(false);
            });
    };

    function submitButton(){
        if (!isFileValid){
            toast.error("You must upload atleast 1 file!");
        }
    }

    return (
        <>
            <h1 style={{ fontFamily: 'nike-font', textAlign: 'center'/*, marginTop: '100px'*/ }}>ADD ITEM</h1>
            <form onSubmit={handleSubmit} className='emailform'>
                <div className='email-form-data-input-section'>
                    <label>Shoe Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <div style={{display:'flex', gap:'20px', alignItems:'center', marginBottom:'5px'}}><label>Shoe Sizes</label>                    <button type="button" onClick={handleAddSize} style={{display:'flex', textAlign:'center', justifyContent:'center',alignItems:'center',width:'30px', height:'30px', fontSize:'20px', fontWeight:'bold',backgroundColor:'#32de84', color:'white', borderRadius:'9px'}}>+</button></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {sizes.map((size, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="text"
                                    value={size}
                                    onChange={(e) => handleSizeChange(index, e.target.value)}
                                    required
                                />
                                {sizes.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveSize(index)} style={{display:'flex', justifyContent:'center', textAlign:'center',alignItems:'center',width:'30px', height:'30px', backgroundColor:'#FF033E', color:'white', borderRadius:'9px'}}>
                                        <svg width="30px" height="30px" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='email-form-data-input-section'>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <label>Description:</label>
                    <ReactQuill
                        value={description}
                        modules={modules}
                        formats={formats}
                        onChange={setDescription}
                        bounds={'.email-form-data-input-section'}
                        required
                    />
                </div><br />

                <div className='email-form-data-input-section'>
                    <label>Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            // If value is NaN or less than 0, set it to 0
                            setPrice(isNaN(value) || value < 0 ? 0 : value);
                        }}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <DropZone files={files} setFiles={setFiles} 
                         onValidationChange={handleValidationChange}
                           isRequired={true} />
                </div>

                {/* {!isFileValid && <p style={{fontSize:'0.6rem', color:'red'}}>Please upload at least one file.</p>} */}
                <button type="submit" className='submit-contact-form' disabled={loading} onClick={submitButton}>{`${loading? "Adding Item...": "Add Item"}`}</button>
            </form>
            {showpopUp && <Popup msg={'🎉Successfully Added Item!🎉'} onClose={handleClosePopup} />}
            {isLoading && <LoadingSpinner/>}

        </>
    );
}

import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DropZone from '../components/DropBox.js';
import Popup from '../components/Popup.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {ShoeCard} from '../pages/ShoeCard.js';
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

export function UpdateItemPage() {
    const [isLoading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const [shoe, setShoe] = useState(null);
    const [name, setName] = useState('');
    const [newname, setNewname] = useState('');
    const [sizes, setSizes] = useState(['']);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]);
    const [isFileValid, setIsFileValid] = useState(true);


    const navigate = useNavigate();


    const handleClosePopup = () => {
        setShowPopup(false);
        navigate("/admin");
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

    function handleDescriptionChange(htmlContent) {
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

        const filesToConvert = files.filter(file => !file.url); //Cloudinary URLs have a url property
        const photosBase64 = await Promise.all(filesToConvert.map(file => convertToBase64(file)));

        // Get URLs for Cloudinary files
        const cloudinaryFiles = files.filter(file => file.url).map(file => file.url);
        const allPhotos = [...cloudinaryFiles, ...photosBase64];
        

        const formData = {
            name: newname,
            sizes,
            category,
            description: handleDescriptionChange(description),
            price,
            photos: allPhotos
        };

        fetch(`http://localhost:4000/api/product/${shoe._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item updated:', data);
                setLoading(false);
                setShowPopup(true);
            })
            .catch(error => console.error('Error updating item:', error));
    };

    function submitButton() {
        if (!isFileValid) {
            toast.error("You must upload at least 1 file!");
        }
    }

    //testing
    useEffect(()=>{
        console.log(shoe);
        if (shoe){
            setNewname(shoe.name);
            setSizes(shoe.sizes);
            setCategory(shoe.category);
            setDescription(shoe.description);
            setPrice(shoe.price);
            setFiles(shoe.photos); 
        }
        else{
            setNewname('');
            setSizes(['']);
            setCategory('');
            setDescription('');
            setPrice('');
            setFiles([]); 
        }
        console.log(newname);
        console.log(sizes);
        console.log(category);
        console.log(description);
        console.log(price);
        console.log(files);
               
    }, [shoe]);

    useEffect(()=>{console.log(files)}, [files])



    // Perform exact search
    function OnChangeName(query) {
        setName(query);
        if (query==='' || query===' '){
            setNewname('');
            setSizes([]);
            setCategory('');
            setDescription('');
            setPrice('');
            setFiles([]); 
            return;
        }
        fetch('http://localhost:4000/api/exactsearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setShoe(data);
        })
        .catch(error => {
            console.log(`Could not find shoe`);
            setShoe(null);
        });
    }
    

    return (
        <>
            <h1 style={{ fontFamily: 'nike-font', textAlign: 'center' }}>UPDATE ITEM</h1>

            <form onSubmit={handleSubmit} className='emailform'>
                <div className='email-form-data-input-section'>
                    <label> Enter shoe Name or ID: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => OnChangeName(e.target.value)}
                        required
                    />
                </div>

                {(shoe && name!=='') && <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}><ShoeCard shoe={shoe}/></div>}

                <div className='email-form-data-input-section'>
                    <label>New name:  </label>
                    <input
                        type="text"
                        value={newname}
                        onChange={(e) => setNewname(e.target.value)}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '5px' }}>
                        <label>Shoe Sizes</label>
                        <button type="button" onClick={handleAddSize} style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', fontSize: '20px', fontWeight: 'bold', backgroundColor: '#32de84', color: 'white', borderRadius: '9px' }}>+</button>
                    </div>

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

                <button type="submit" className='submit-contact-form' disabled={loading} onClick={submitButton}>{loading? "Updating Item...": "Update Item"}</button>
            </form>

            {showPopup && <Popup msg={'🎉Successfully Updated Item!🎉'} onClose={handleClosePopup} />}

            {isLoading && <LoadingSpinner/>}

        </>
    );
}
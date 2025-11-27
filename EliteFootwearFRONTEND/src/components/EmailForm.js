import React, { useState, useRef } from 'react';
import { sendForm } from '@emailjs/browser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';


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


export default function EmailForm() {
    const [content, setContent] = useState('');
    const form = useRef();
    const [loading, setLoading] = useState(false);

    function toText(htmlContent){
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

    const sendEmail = (e) => {
        e.preventDefault();
        form.current.message.value = toText(form.current.message.value);
        setLoading(true);

        toast.promise(
            sendForm('service_p512n45', 'template_c0nvbwh', form.current, '4QCcjpIbF5CjT6Okg'),
            {
                loading: 'Sending email...',
                success: 'Email sent successfully!',
                error: 'Could not send email'
            }
        )
        .finally(() => {
            setLoading(false);
            form.current.reset();
            setContent('');
        });
    };

    return (
    <>
        <form ref={form} onSubmit={sendEmail} className='emailform'>
            <div className='email-form-data-input-section'>
                {/* <label>Recipient's Name</label> */}
                <input required type="hidden" name="to_name" value={'shyam'} />
            </div>

            <div className='email-form-data-input-section'>
                <label>Email: </label>
                <input required type="text" name="from_name" />
            </div>

            <div className='email-form-data-input-section'>
                <label>Message</label><br/>
                <ReactQuill 
                    value={content} 
                    modules={modules} 
                    formats={formats}
                    onChange={newValue => setContent(newValue)}
                    bounds={'.email-form-data-input-section'}
                    style={{height:'150px'}}
                    required
                />
                <input type="hidden" name="message" value={content} />
            </div>

            <input type="submit" value={loading ? 'Sending...' : 'SUBMIT'}  className='submit-contact-form' disabled={loading}/>
        </form>
    </>
    );
}

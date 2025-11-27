import { useState } from "react";
import { Navigate } from "react-router-dom";
// import {toast, Bounce, Slide} from 'react-toastify';
import toast from "react-hot-toast";
import { LoadingSpinner } from "../components/LoadingSpinner";



export default  function RegisterPage(){

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pno, setPno] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [name, setName] = useState('');

    const handleInputChange = (ev) => {
        const { value } = ev.target;
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        setPno(numericValue);
      };

    async function register(ev){
        ev.preventDefault();
        setIsLoading(true);
        try{
            const response = await fetch('http://localhost:4000/api/customers', {
                method: 'POST',
                body: JSON.stringify({
                                        name:name,
                                        email: email,
                                        phone: pno,
                                        password:password,
                                        cart:[],
                                        favorites:[],
                                        selectedSize: [],
                                        quantity:[]
                                    }),
                headers: {'Content-type': 'application/json'}
            });
            const result = await response.json();
            if (response.ok) {
                toast.success('Registration Successful!');
                setRedirect(true);
            }
            else {
                // Display the error from the response body
                // toast.error(`Registration Failed!\n${responseBody.message || 'An error occurred.'}`, {
                //     duration: 5000,
                //     position: "top-center",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: 0,
                //     theme: "light"
                // });
                toast(`An error occurred while reaching to the server:\n${response.body}`,{duration: 5000});
            }
        }

        catch(error){
            // Handle network errors or unexpected issues
            console.error('Registration error:', error);
            // toast.error(`An unexpected error occurred:\n${error.message}`, {
            //     duration: 5000,
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: 0,
            //     theme: "light"
            // });
            toast(`An error occurred while reaching to the server:\n${error}`,{duration: 5000});

        }
        finally {
            setIsLoading(false);
        }
    }

    if (redirect){
        return (<Navigate to= {"/login"} />);
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>REGISTER</h1>
            <input type="text" 
                   placeholder="name" 
                   value={name}
                   onChange={ev => {setName(ev.target.value)}}/>
            <input type="text" 
                   placeholder="username" 
                   value={email}
                   onChange={ev => setEmail(ev.target.value)}
                   required/>
            <input type="password" 
                   placeholder="password" 
                   value={password}
                   onChange={ev => {setPassword(ev.target.value)}}
                   required/>
            <input 
                type="text" 
                placeholder="phone number"
                value = {pno}
                onChange= {handleInputChange}
                required
            />
            <button>Register</button>
            {isLoading && <LoadingSpinner/>}

        </form>
    );
}
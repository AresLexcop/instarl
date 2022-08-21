import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { isValid } from 'date-fns';
import * as ROUTES from '../constants/route';
export default function Login() {
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext)
    
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password  === '' || emailAdress === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAdress, password);
            navigate(ROUTES.DASHBOARD);
        }
        catch (error) {
            setEmailAdress('');
            setPassword('');
            setError(error.message);   
        }
    };

    useEffect(() => {
        document.title = 'Login - Instarl'
    }, []);

    return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className='flex w-3/5'>
            {/* <img src='/images/iphone-with-profile.jpg' alt='iPhone with Instarl app' className='m-x-full'/> */}
            <LazyLoadImage
                alt='iPhone with Instarl app'
                effect="blur"
                src='/images/iphone-with-profile.jpg' />
        </div>
        <div className='flex flex-col w-2/5'>
            <div className='flex flex-col items-center bg-white p-4 border bordere-gray-primary mb-4 rounded'>
            <h1 className='flex justify-center full-w'>
                <img src='/images/logo.png' alt='Instarl' className='mt-2 w-6/12 mb-4'/>
            </h1>
            {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
            <form onSubmit={handleLogin} method='POST'>
                <input 
                    aria-label='Enter your email address'
                    type="text"
                    placeholder="Email address" 
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setEmailAdress(target.value) }
                    value={emailAdress}
                /> 
                <input 
                    aria-label='Enter your Password'
                    type="password"
                    placeholder="Password" 
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setPassword(target.value) }
                    value={password}
                /> 
                <button 
                    disabled={isInvalid}
                    type="submit"
                    className={`bg-blue-500 text-black w-full rounded-full h-8 font-blod ${isInvalid && 'opacity-50'}`}>
                        Log In
                </button>
            </form>
        </div>
        <div className='flex justify-center items-center flex-col w-half bg-green-500 p-4 border border-gray-primary rounded'>
            <p className='text-sm text-center'  >
                Don't have an acount?!?!?! {''}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Sign up
            </Link>
            </p>
        </div>
        </div>
    </div>);
}
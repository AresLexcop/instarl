import { useContext } from "react";
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user'
import * as ROUTES from '../constants/route';
import useUser from "../hooks/use-user";
export default function Header() {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    
    return (
        <header className="h-16 bg-blue-200 boder-b boder-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full ">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to = {ROUTES.DASHBOARD} aria-label="Instarl Logo" >
                                <img src="/images/logo.png" alt="Instarl" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                <div className="text-gray-700 test-center flex items-center align-items">
                    { user ? (
                        <>
                            <Link to = {ROUTES.DASHBOARD} aria-label="Dashboard">
                            <svg 
                                className="w-8 mr-6 text-black-500 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path 
                                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0
                                    001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 
                                    001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" 
                                />
                            </svg>
                            </Link>
                            <Link to = {ROUTES.LOGIN} aria-label="Log In">
                            <button 
                                type="button"
                                title="Sign Out"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        firebase.auth().signOut()
                                    }
                                }} 
                            >
                                <svg 
                                    className="w-8 mr-6 text-black-500 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0
                                        013-3h4a3 3 0 013 3v1" 
                                    />
                                </svg>
                            </button>
                            </Link>
                            <div className="flex items-center cursor-pointer">
                                <Link to={`/p/${user.displayName}`}>
                                    <img
                                        className="rounded-full h-8 w-8 flex"
                                        src={`/images/avatars/${user.displayName}.png`}
                                        alt={`${user.displayName} profile`}    
                                    />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to={ROUTES.LOGIN} >
                                <button 
                                type="button"
                                className="bg-green-500 font-bold text-sm text-center rounded text-white w-20 h-8"
                                >
                                    Log In
                                </button>
                            </Link>
                            <Link to={ROUTES.SIGN_UP}>
                                <button 
                                type="button"
                                className="font-bold text-sm text-center rounded text-blue w-20 h-8"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
                </div>
            </div>
        </header>

    );
}

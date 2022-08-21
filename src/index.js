import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <>
        <FirebaseContext.Provider value={{ firebase, FieldValue }}>
            <App />
        </FirebaseContext.Provider>
    </>)


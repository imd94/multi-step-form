import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import './assets/styles/styles.scss';

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Context
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

// Components
import Register from './components/Register';

function App(props) {
    const originalState = {
        test: ''
    }

    function ourReducer(draft, action) {
        switch(action.type) {
            case 'test':
                draft.test = 'test';
                return;
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, originalState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>

                <BrowserRouter basename={ process.env.REACT_APP_FILE_PATH_DIST }>

                    <Routes>
                        <Route path="/" element={<Register />} />
                    </Routes>  

                </BrowserRouter>

            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
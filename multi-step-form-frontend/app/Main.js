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
import Register from './components/Registration/Register';

function App(props) {
    const originalState = {
        stepOne: {
            status: Boolean(localStorage.getItem('stepOneStatus')),
            data: JSON.parse(localStorage.getItem('stepOneData')) || {
                name: '',
                email: '',
                phone: ''
            }
        },
        stepTwo: {
            status: Boolean(localStorage.getItem('stepTwoStatus')),
            data: JSON.parse(localStorage.getItem('stepTwoData'))
        },
        stepThree: {
            status: Boolean(localStorage.getItem('stepThreeStatus')),
            data: JSON.parse(localStorage.getItem('stepThreeData'))
        },
        stepFour: {
            status: Boolean(localStorage.getItem('stepFourStatus'))
        },
        stepCounter: localStorage.getItem('stepNum') || 1,
        billingYearly: Boolean(localStorage.getItem('billingYearly')) || '',
        previous: false,
        regCompleted: false,
        loggedIn: Boolean(localStorage.getItem('appToken')),
        user: {
            token: localStorage.getItem('appToken'),
            email: localStorage.getItem('appEmail')
        }
    }

    function ourReducer(draft, action) {
        switch(action.type) {
            case 'nextStep':
                draft.previous = false;
                draft.stepCounter++;
                return;
            case 'prevStep':
                draft.previous = true;
                draft.stepCounter--;
                return;
            case 'updateCurrentStep':
                draft.stepCounter = action.value;
                return;
            case 'billingType':
                draft.billingYearly = action.value;
                return;
            case 'stepOneStatus':
                draft.stepOne.status = action.value;
                draft.stepOne.data = action.data;
                return;
            case 'stepOneData':
                draft.stepOne.data = action.data;
                return;
            case 'stepTwoStatus':
                draft.stepTwo.status = action.value;
                draft.stepTwo.data = action.data;
                return;
            case 'stepTwoData':
                draft.stepTwo.data = action.data;
                return;
            case 'stepThreeStatus':
                draft.stepThree.status = action.value;
                draft.stepThree.data = action.data;
                return;
            case 'stepThreeData':
                draft.stepThree.data = action.data;
                return;
            case 'stepFourStatus':
                draft.stepFour.status = action.value;
                return;
            case 'registrationCompleted':
                draft.regCompleted = true;
                return;
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, originalState);

    useEffect(() => {
        if(state.stepCounter) {
            state.stepOne.status && localStorage.setItem('stepOneStatus', 'completed');
            state.stepTwo.status && localStorage.setItem('stepTwoStatus', 'completed');
            state.stepThree.status && localStorage.setItem('stepThreeStatus', 'completed');
            state.stepFour.status && localStorage.setItem('stepFourStatus', 'completed');

            if(!state.previous) {
                if(state.stepOne.status) {
                    localStorage.setItem('stepNum', 2);
                    localStorage.setItem('stepOneData', JSON.stringify(state.stepOne.data));
                }

                if(state.stepTwo.status) {
                    localStorage.setItem('stepNum', 3);
                    localStorage.setItem('stepTwoData', JSON.stringify(state.stepTwo.data));
                }
                
                if(state.stepThree.status) {
                    localStorage.setItem('stepNum', 4);
                    localStorage.setItem('stepThreeData', JSON.stringify(state.stepThree.data));
                }
            }
        }
    }, [state.stepCounter]);

    useEffect(() => {
        if(state.billingYearly) {
            localStorage.setItem('billingYearly', state.billingYearly);
        } else {
            localStorage.removeItem('billingYearly');
        }
    }, [state.billingYearly, state.stepCounter]);

    useEffect(() => {
        if(state.regCompleted) {
            localStorage.removeItem('stepOneStatus');
            localStorage.removeItem('stepTwoStatus');
            localStorage.removeItem('stepThreeStatus');
            localStorage.removeItem('stepFourStatus');
            localStorage.removeItem('stepOneData');
            localStorage.removeItem('stepTwoData');
            localStorage.removeItem('stepThreeData');
            localStorage.removeItem('billingYearly');
            localStorage.removeItem('stepNum');
        }
    }, [state.regCompleted]);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>

                <BrowserRouter basename={ process.env.REACT_APP_FILE_PATH_DIST }>

                    <Routes>
                        <Route path="/" element={ <Register /> } />
                    </Routes>  

                </BrowserRouter>

            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
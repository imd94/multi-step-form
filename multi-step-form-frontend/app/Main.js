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
            status: Boolean(localStorage.getItem('stepOneStatus'))
        },
        stepTwo: {
            status: Boolean(localStorage.getItem('stepTwoStatus'))
        },
        stepThree: {
            status: Boolean(localStorage.getItem('stepThreeStatus'))
        },
        stepFour: {
            status: Boolean(localStorage.getItem('stepFourStatus'))
        },
        stepCounter: localStorage.getItem('stepNum') || 1,
        previous: false
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
            case 'stepOneStatus':
                draft.stepOne.status = action.value;
                return;
            case 'stepTwoStatus':
                draft.stepTwo.status = action.value;
                return;
            case 'stepThreeStatus':
                draft.stepThree.status = action.value;
                return;
            case 'stepFourStatus':
                draft.stepFour.status = action.value;
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
                }

                if(state.stepTwo.status) {
                    localStorage.setItem('stepNum', 3);
                }
                
                if(state.stepThree.status) {
                    localStorage.setItem('stepNum', 4);
                }

                if(state.stepFour.status) {
                    localStorage.setItem('stepNum', 5);
                }
            }

            /* if(state.stepCounter == 5) {
                localStorage.removeItem('stepOneStatus');
                localStorage.removeItem('stepTwoStatus');
                localStorage.removeItem('stepThreeStatus');
                localStorage.removeItem('stepFourStatus');
                localStorage.removeItem('stepNum');
            } */

            // Save every step on next in local storage
            /* if(!state.previous) {
                localStorage.setItem('stepNum', state.stepCounter);
            } */
        }
    }, [state.stepCounter]);

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
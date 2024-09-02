import React, { useEffect, useContext, useRef, useState } from "react";
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function StepOnePersonalInfo() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const validationRef = useRef(null);
    const transitionStyles = {
        entering: { opacity: 0, transform: 'translateY(0)' },
        entered: { opacity: 1, transform: 'translateY(-100%)', transition: 'opacity 150ms ease-in, transform 150ms ease-in' },
        exiting: { opacity: 0, transform: 'translateY(0)', transition: 'opacity 150ms ease-out, transform 150ms ease-out' }, // Add transition for exit
        exited: { opacity: 0, transform: 'translateY(0)', transition: 'opacity 150ms ease-out, transform 150ms ease-out' },
    };

    const originalState = {
        name: {
            value: appState.stepOne.data.name,
            hasErrors: false,
            errorMessage: ''
        },
        email: {
            value: appState.stepOne.data.email,
            hasErrors: false,
            errorMessage: '',
            isUnique: false,
            checkCount: 0
        },
        phone: {
            value: appState.stepOne.data.phone,
            hasErrors: false,
            errorMessage: '',
            isUnique: false,
            checkCount: 0
        },
        submitStepCount: 0
    }
    function stepReducer(draft, action) {
        switch(action.type) {
            case 'validateNameImmediately':
                draft.name.hasErrors = false;
                draft.name.value = action.value;

                if(!draft.name.value.length) {
                    draft.name.hasErrors = true;
                    draft.name.errorMessage = 'Field cannot be empty.'
                } else {
                    if(draft.name.value.length > 50) {
                        draft.name.hasErrors = true;
                        draft.name.errorMessage = 'Name cannot exceed 50 characters.'
                    } 
                }
                return;
            case 'validateNameAfterDelay':
                if(!/^[\p{L}" "]+$/u.test(draft.name.value) ) {
                    draft.name.hasErrors = true;
                    draft.name.errorMessage = 'Name must contain only letters.'
                }
                return;
            case 'validateEmailImmediately':
                draft.email.hasErrors = false;
                draft.email.value = action.value;

                if(!draft.email.value.length) {
                    draft.email.hasErrors = true;
                    draft.email.errorMessage = 'Field cannot be empty.'
                }
                return;
            case 'validateEmailAfterDelay':
                if(!/^\S+@\S+$/.test(draft.email.value)) {
                    draft.email.hasErrors = true;
                    draft.email.errorMessage = 'You must provide a valid email address.';
                }

                if(!draft.email.hasErrors && !action.noRequest) {
                    draft.email.checkCount++;
                }
                return;
            case 'emailUniqueResults':
                
                return;
            case 'validatePhoneImmediately':
                draft.phone.hasErrors = false;
                draft.phone.value = action.value;

                if(!draft.phone.value.length) {
                    draft.phone.hasErrors = true;
                    draft.phone.errorMessage = 'Field cannot be empty.'
                } else {
                    if(/^\+[a-zA-Z]+\d?$/.test(draft.phone.value) ) {
                        draft.phone.hasErrors = true;
                        draft.phone.errorMessage = 'Phone number must contain only numeric values.'
                    } else if(draft.phone.value.length > 16) {
                        draft.phone.hasErrors = true;
                        draft.phone.errorMessage = 'Phone number cannot exceed 15 characters.'
                    } else if(!draft.phone.value.startsWith('+')) {
                        draft.phone.hasErrors = true;
                        draft.phone.errorMessage = 'Phone number must start with the + symbol.'
                    }
                }
                return;
            case 'validatePhoneAfterDelay':
                if(!/^\+(?:[0-9] ?)+[0-9]$/.test(draft.phone.value)) {
                    draft.phone.hasErrors = true;
                    draft.phone.errorMessage = 'Phone number format is invalid.'
                } else if(draft.phone.value.length < 7) {
                    draft.phone.hasErrors = true;
                    draft.phone.errorMessage = 'Phone number cannot be lower then 7 characters.'
                }   

                if(!draft.phone.hasErrors && !action.noRequest) {
                    draft.phone.checkCount++;
                }
                return;
            case 'phoneUniqueResults':
                
                return;
            case 'submitStep':
                if(!draft.name.hasErrors && !draft.email.hasErrors && !draft.phone.hasErrors) {
                    draft.submitStepCount++;
                }
                return;
        }
    }
    const [state, dispatch] = useImmerReducer(stepReducer, originalState);

    useEffect(() => {
        if(state.phone.value) {
            const delay = setTimeout(() => {
                dispatch({ type: 'validatePhoneAfterDelay' });
            }, 800);

            return () => clearTimeout(delay);
        }
    }, [state.phone.value]);

    useEffect(() => {
        if(state.name.value) {
            const delay = setTimeout(() => {
                dispatch({ type: 'validateNameAfterDelay' });
            }, 800);

            return () => clearTimeout(delay);
        }
    }, [state.name.value]);

    useEffect(() => {
        if(state.email.value) {
            const delay = setTimeout(() => {
                dispatch({ type: 'validateEmailAfterDelay' });
            }, 800);

            return () => clearTimeout(delay);
        }
    }, [state.email.value]);

    useEffect(() => {
        if(state.submitStepCount) {
            appDispatch({ type: 'nextStep' });

            // If step is not already completed
            if(!appState.stepOne.status) {
                appDispatch({ 
                    type: 'stepOneStatus', 
                    value: 'completed', 
                    data: {
                        name: state.name.value,
                        email: state.email.value,
                        phone: state.phone.value
                    } 
                });
            }
        }
    }, [state.submitStepCount]);

    function handleSubmit(e) {
        e.preventDefault();

        dispatch({ type: 'validateNameImmediately', value: state.name.value });
        dispatch({ type: 'validateNameAfterDelay', value: state.name.value });
        dispatch({ type: 'validateEmailImmediately', value: state.email.value });
        dispatch({ type: 'validateEmailAfterDelay', value: state.email.value, noRequest: true });
        dispatch({ type: 'validatePhoneImmediately', value: state.phone.value });
        dispatch({ type: 'validatePhoneAfterDelay', value: state.phone.value, noRequest: true });
        dispatch({ type: 'submitStep' });
    }

    return (
        <div className="max-w-[28.125rem] h-full mx-auto relative">   
            <header className="mb-9">
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-3">Personal info</h2>
                <p className="text-base text-app_neutral-CoolGray">Please provide your name, email address, and phone number.</p>
            </header>

            <div className="">
                <form id="stepOneForm" onSubmit={ handleSubmit }>
                    <div className="relative mb-6">
                        <label htmlFor="full_name" className="block text-[0.9375rem] text-primary-MarineBlue mb-[0.3125rem]">Name</label>
                        <input onChange={ (e) => dispatch({ type: 'validateNameImmediately', value: e.target.value }) } type="text" id="full_name" name="full_name" placeholder="e.g. Stephen King" autoComplete="off" value={ state.name.value } className={`block w-full text-base relative z-[2] text-primary-MarineBlue font-medium border border-app_neutral-LightGray rounded-lg py-[0.6875rem] px-[0.9375rem] placeholder:text-app_neutral-CoolGray placeholder:font-medium focus:border-primary-PurplishBlue focus-visible:border-primary-PurplishBlue focus-visible:outline-none hover:cursor-pointer hover:border-primary-PurplishBlue transition ease-in-out duration-300 ${ state.name.hasErrors && 'border-primary-StrawberryRed' }`} />
                        <CSSTransition nodeRef={ validationRef } in={ state.name.hasErrors } timeout={ 150 } classNames={ 'liveValidateMessage' }>
                            { (cssBlock) => (
                                <span ref={ validationRef } className={`block w-full rounded-t-lg text-[0.8125rem] text-validation-danger-val-text bg-validation-danger-val-bg pt-2 pb-3.5 px-[0.9375rem] font-medium absolute bottom-[0] left-0 z-[1] tracking-tight liveValidateMessage`} style={{ ...transitionStyles[cssBlock] }}>{ state.name.errorMessage }</span>
                            ) }
                        </CSSTransition>
                    </div>

                    <div className="relative mb-6">
                        <label htmlFor="email" className="block text-[0.9375rem] text-primary-MarineBlue mb-[0.3125rem]">Email Address</label>
                        <input onChange={ (e) => dispatch({ type: 'validateEmailImmediately', value: e.target.value }) } type="text" id="email" name="email" placeholder="e.g. stephenking@lorem.com" autoComplete="off" value={ state.email.value } className={`block w-full relative z-[2] text-base text-primary-MarineBlue font-medium border border-app_neutral-LightGray rounded-lg py-[0.6875rem] px-[0.9375rem] placeholder:text-app_neutral-CoolGray placeholder:font-medium focus:border-primary-PurplishBlue focus-visible:border-primary-PurplishBlue focus-visible:outline-none hover:cursor-pointer hover:border-primary-PurplishBlue transition ease-in-out duration-300 ${ state.email.hasErrors && 'border-primary-StrawberryRed' }`} />
                        <CSSTransition nodeRef={ validationRef } in={ state.email.hasErrors } timeout={ 150 } classNames={ 'liveValidateMessage' }>
                            { (cssBlock) => (
                                <span ref={ validationRef } className={`block w-full rounded-t-lg text-[0.8125rem] text-validation-danger-val-text bg-validation-danger-val-bg pt-2 pb-3.5 px-[0.9375rem] font-medium absolute bottom-[0] left-0 z-[1] tracking-tight liveValidateMessage`} style={{ ...transitionStyles[cssBlock] }}>{ state.email.errorMessage }</span>
                            ) }
                        </CSSTransition>
                    </div>

                    <div className="relative mb-6">
                        <label htmlFor="phone_number" className="block text-[0.9375rem] text-primary-MarineBlue mb-[0.3125rem]">Phone Number</label>
                        <input onChange={ (e) => dispatch({ type: 'validatePhoneImmediately', value: e.target.value }) } type="tel" id="phone_number" name="phone_number" placeholder="e.g. +1 234 567 890" autoComplete="off" value={ state.phone.value } className={`block w-full relative z-[2] text-base text-primary-MarineBlue font-medium border border-app_neutral-LightGray rounded-lg py-[0.6875rem] px-[0.9375rem] placeholder:text-app_neutral-CoolGray placeholder:font-medium focus:border-primary-PurplishBlue focus-visible:border-primary-PurplishBlue focus-visible:outline-none hover:cursor-pointer hover:border-primary-PurplishBlue transition ease-in-out duration-300 ${ state.phone.hasErrors && 'border-primary-StrawberryRed' }`} />
                        <CSSTransition nodeRef={ validationRef } in={ state.phone.hasErrors } timeout={ 150 } classNames={ 'liveValidateMessage' }>
                            { (cssBlock) => (
                                <span ref={ validationRef } className={`block w-full rounded-t-lg text-[0.8125rem] text-validation-danger-val-text bg-validation-danger-val-bg pt-2 pb-3.5 px-[0.9375rem] font-medium absolute bottom-[0] left-0 z-[1] tracking-tight liveValidateMessage`} style={{ ...transitionStyles[cssBlock] }}>{ state.phone.errorMessage }</span>
                            ) }
                        </CSSTransition>
                    </div>
                </form>
            </div>

            <footer className="flex justify-between absolute bottom-0 right-0 w-full">
                <button className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3 ml-auto" type="submit" form="stepOneForm">Next Step</button>
            </footer>
        </div>
    );
}

export default StepOnePersonalInfo;
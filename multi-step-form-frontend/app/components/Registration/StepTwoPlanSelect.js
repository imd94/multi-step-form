import React, { useEffect, useContext, useState } from "react";
import { useImmer } from "use-immer";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function StepTwoPlanSelect() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const [submitStepCount, setSubmitStepCount] = useState(0);

    const [state, setState] = useImmer({
        plans: {
            arcade: {
                name: 'Arcade',
                price: 9
            },
            advanced: {
                name: 'Advanced',
                price: 12
            },
            pro: {
                name: 'Pro',
                price: 15
            }
        },
        selectedPlan: appState.stepTwo.data || {
            name: 'arcade',
            price: 9
        },
        billingYearly: appState.billingYearly || ''
    });
    
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitStepCount(prev => prev + 1);
    }

    function handleStepBack(e) {
        e.preventDefault();
        appDispatch({ type: 'prevStep' });
    }

    useEffect(() => {
        if(submitStepCount) {
            appDispatch({ type: 'nextStep' });

            if(!appState.stepTwo.status) {
                appDispatch({ 
                    type: 'stepTwoStatus', 
                    value: 'completed', 
                    data: state.selectedPlan
                });
            } else {
                appDispatch({ 
                    type: 'stepTwoData', 
                    data: state.selectedPlan
                });
            }
        }
    }, [submitStepCount]);

    useEffect(() => {
        if(appState.billingYearly) {
            setState((draft) => {
                draft.plans.arcade.price = 90;
                draft.plans.advanced.price = 120;
                draft.plans.pro.price = 150;

                if(draft.selectedPlan.name === 'arcade') {
                    draft.selectedPlan.price = 90;
                } else if(draft.selectedPlan.name === 'advanced') {
                    draft.selectedPlan.price = 120;
                } else if(draft.selectedPlan.name === 'pro') {
                    draft.selectedPlan.price = 150;
                }
            });
        } else {
            setState((draft) => {
                draft.plans.arcade.price = 9;
                draft.plans.advanced.price = 12;
                draft.plans.pro.price = 15;

                if(draft.selectedPlan.name === 'arcade') {
                    draft.selectedPlan.price = 9;
                } else if(draft.selectedPlan.name === 'advanced') {
                    draft.selectedPlan.price = 12;
                } else if(draft.selectedPlan.name === 'pro') {
                    draft.selectedPlan.price = 15;
                }
            });
        }
    }, [appState.billingYearly]);

    useEffect(() => {
        appDispatch({ type: 'billingType', value: state.billingYearly });
    }, [state.billingYearly]);

    return (
        <div className="max-w-[28.125rem] h-full mx-auto relative max-xs:max-w-full max-xs:mx-0 max-xs:bg-white max-xs:px-6 max-xs:pt-8 max-xs:pb-8 max-xs:rounded-xl">
            <header className="mb-9 max-xs:mb-6">
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-3 max-xs:text-[1.6rem] max-xs:mb-2">Select your plan</h2>
                <p className="text-base text-app_neutral-CoolGray">You have the option of monthly or yearly billing.</p>
            </header>

            <form id="stepTwoForm" onSubmit={ handleSubmit }>
                <div className="grid grid-cols-[calc((100%_/_3)_-_((1.125rem_*_2)_/_3))_calc((100%_/_3)_-_((1.125rem_*_2)_/_3))_calc((100%_/_3)_-_((1.125rem_*_2)_/_3))] gap-[1.125rem] mb-8 max-sm:gap-2 max-sm:grid-cols-[calc((100%_/_3)_-_((0.5rem_*_2)_/_3))_calc((100%_/_3)_-_((0.5rem_*_2)_/_3))_calc((100%_/_3)_-_((0.5rem_*_2)_/_3))] max-xs:grid-cols-[100%]">

                    <input onChange={ (e) => setState(draft => { draft.selectedPlan.name = e.target.value; draft.selectedPlan.price = state.plans.arcade.price; }) } checked={ state.selectedPlan.name === 'arcade' } className="peer/arcade hidden" type="radio" id="arcade" name="subscription_plan" value="arcade" />
                    <label className="flex flex-col justify-between gap-9 py-5 px-4 border border-app_neutral-LightGray rounded-[.5rem] transition-all peer-checked/arcade:border-primary-PurplishBlue peer-checked/arcade:bg-app_neutral-Alabaster cursor-pointer max-sm:px-3 max-xs:flex-row max-xs:gap-[0.9375rem] max-xs:p-4 max-xs:justify-start" htmlFor="arcade">
                        <span className="inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fillRule="evenodd"><circle cx="20" cy="20" r="20" fill="#FFAF7E"/><path fill="#FFF" fillRule="nonzero" d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"/></g></svg>
                        </span>

                        <div className="">
                            <span className="block text-primary-MarineBlue font-medium max-sm:text-sm">Arcade</span>
                            <span className="block text-app_neutral-CoolGray text-sm mb-1">${state.plans.arcade.price}/{ !state.billingYearly ? 'mo' : 'yr' }</span>
                            { state.billingYearly && <span className="block text-xs text-primary-MarineBlue">2 months free</span> }
                        </div>
                    </label>

                    <input onChange={ (e) => setState(draft => { draft.selectedPlan.name = e.target.value; draft.selectedPlan.price = state.plans.advanced.price; }) } checked={ state.selectedPlan.name === 'advanced' } className="peer/advanced hidden" type="radio" id="advanced" name="subscription_plan" value="advanced" />
                    <label className="flex flex-col justify-between gap-9 py-5 px-4 border border-app_neutral-LightGray rounded-[.5rem] transition-all peer-checked/advanced:border-primary-PurplishBlue peer-checked/advanced:bg-app_neutral-Alabaster cursor-pointer max-sm:px-3 max-xs:flex-row max-xs:gap-[0.9375rem] max-xs:p-4 max-xs:justify-start" htmlFor="advanced">
                        <span className="inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fillRule="evenodd"><circle cx="20" cy="20" r="20" fill="#F9818E"/><path fill="#FFF" fillRule="nonzero" d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"/></g></svg>
                        </span>

                        <div className="">
                            <span className="block text-primary-MarineBlue font-medium max-sm:text-sm">Advanced</span>
                            <span className="block text-app_neutral-CoolGray text-sm mb-1">${state.plans.advanced.price}/{ !state.billingYearly ? 'mo' : 'yr' }</span>
                            { state.billingYearly && <span className="block text-xs text-primary-MarineBlue">2 months free</span> }
                        </div>
                    </label>

                    <input onChange={ (e) => setState(draft => { draft.selectedPlan.name = e.target.value; draft.selectedPlan.price = state.plans.pro.price; }) } checked={ state.selectedPlan.name === 'pro' } className="peer/pro hidden" type="radio" id="pro" name="subscription_plan" value="pro" />
                    <label className="flex flex-col justify-between gap-9 py-5 px-4 border border-app_neutral-LightGray rounded-[.5rem] transition-all peer-checked/pro:border-primary-PurplishBlue peer-checked/pro:bg-app_neutral-Alabaster cursor-pointer max-sm:px-3 max-xs:flex-row max-xs:gap-[0.9375rem] max-xs:p-4 max-xs:justify-start" htmlFor="pro">
                        <span className="inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fillRule="evenodd"><circle cx="20" cy="20" r="20" fill="#483EFF"/><path fill="#FFF" fillRule="nonzero" d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"/></g></svg>    
                        </span>

                        <div className="">
                            <span className="block text-primary-MarineBlue font-medium max-sm:text-sm">Pro</span>
                            <span className="block text-app_neutral-CoolGray text-sm mb-1">${state.plans.pro.price}/{ !state.billingYearly ? 'mo' : 'yr' }</span>
                            { state.billingYearly && <span className="block text-xs text-primary-MarineBlue">2 months free</span> }
                        </div>
                    </label>
                </div>

                <div className="flex items-center justify-center mb-28 bg-app_neutral-Alabaster rounded-[.5rem] p-4 max-xs:mb-0">
                    <button onClick={ () => setState((draft) => { draft.billingYearly = false }) } type="button" className={ `${!state.billingYearly && 'text-primary-MarineBlue'} font-bold text-app_neutral-CoolGray pr-5` }>Monthly</button>
                    <input onChange={ (e) => setState((draft) => { draft.billingYearly = e.target.checked }) } checked={ state.billingYearly } type="checkbox" id="monthly" name="monthly" value="monthly" className="peer/billing hidden" />
                    <label htmlFor="monthly" className="transition-all block relative w-[2.375rem] h-[1.25rem] rounded-xl bg-primary-MarineBlue after:content-[''] after:block after:transition-all after:w-3 after:h-3 after:rounded-full after:bg-white after:absolute after:top-1 after:left-1 peer-checked/billing:after:left-[calc(100%_-_(0.75rem_+_0.25rem))] cursor-pointer">
                        <span className="sr-only">Billing</span>
                    </label>
                    <button onClick={ () => setState((draft) => { draft.billingYearly = true }) } type="button" className={ `${state.billingYearly && 'text-primary-MarineBlue'} font-bold text-app_neutral-CoolGray pl-5` }>Yearly</button>
                </div>
            </form>

            <footer className="flex justify-between absolute bottom-0 right-0 w-full max-xs:fixed max-xs:bottom-0 max-xs:left-0 max-xs:bg-white max-xs:p-4">
                <button onClick={ handleStepBack } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-app_neutral-CoolGray bg-transparent rounded-[0.5625rem] px-6 py-3 ml-[-1.5rem]">Go Back</button>
                <button type="submit" form="stepTwoForm" className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3">Next Step</button>
            </footer>
        </div>
    );
}

export default StepTwoPlanSelect;
import React, { useEffect, useContext, useState } from "react";
import { useImmer } from "use-immer";
import Axios from 'axios';
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

import ThankYou from "./ThankYou";

function StepFourSummary() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const [data, setData] = useImmer({
        name: appState.stepOne.data.name,
        email: appState.stepOne.data.email,
        phone: appState.stepOne.data.phone,
        plan: appState.stepTwo.data,
        billing: appState.billingYearly,
        addons: appState.stepThree.data,
        submitCounter: 0
    });

    function handleSubmit(e) {
        e.preventDefault();

        // If step is not already completed
        if(!appState.stepFour.status) {
            setData((draft) => {
                draft.submitCounter++;
            });
            
            if(appState.regCompleted) {
                appDispatch({ type: 'stepFourStatus', value: 'completed' });
            }
        }
    }

    function handleStepBack(e) {
        e.preventDefault();
        appDispatch({ type: 'prevStep' });
    }

    function handleStepChange(e) {
        e.preventDefault();
        appDispatch({ type: 'updateCurrentStep', value: 2 });
    }

    function calcTotal() {
        let totalPrice = Object.values(data.addons).reduce((total, addon) => total + addon.price, 0);
        totalPrice = totalPrice * 1 + data.plan.price * 1;

        return totalPrice;
    }

    useEffect(() => {
        if(appState.billingYearly) {
            setData((draft) => {
                if(draft.plan.name === 'arcade') {
                    draft.plan.price = 90;
                } else if(draft.plan.name === 'advanced') {
                    draft.plan.price = 120;
                } else if(draft.plan.name === 'pro') {
                    draft.plan.price = 150;
                }

                if(draft.addons.addonOne) {
                    draft.addons.addonOne.price = 10;
                }

                if(draft.addons.addonTwo) {
                    draft.addons.addonTwo.price = 20;
                }

                if(draft.addons.addonThree) {
                    draft.addons.addonThree.price = 20;
                }
            });
        } else {
            setData((draft) => {
                if(draft.plan.name === 'arcade') {
                    draft.plan.price = 9;
                } else if(draft.plan.name === 'advanced') {
                    draft.plan.price = 12;
                } else if(draft.plan.name === 'pro') {
                    draft.plan.price = 15;
                }

                if(draft.addons.addonOne) {
                    draft.addons.addonOne.price = 1;
                }

                if(draft.addons.addonTwo) {
                    draft.addons.addonTwo.price = 2;
                }

                if(draft.addons.addonThree) {
                    draft.addons.addonThree.price = 2;
                }
            });
        }
    }, [appState.billingYearly]);

    useEffect(() => {
        if(data.submitCounter) {
            const ourRequest = Axios.CancelToken.source();

            async function createNewUser() {
                const finishedData = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    plan: data.plan,
                    billing: data.billing,
                    addons: data.addons,
                    totalPrice: calcTotal(),
                    createdAt: new Date()
                }

                const cancelToken = { cancelToken: ourRequest.token };

                try {
                    const response = await Axios.post('/register', finishedData, cancelToken);
                    if(response.data.status === 'success') {
                        appDispatch({ type: 'registrationCompleted' });
                    }
                    console.log(response);
                } catch(err) {
                    console.log(err);
                }
            }

            createNewUser();

            return () => {
                ourRequest.cancel();
            }
        }
    }, [data.submitCounter]);

    if(appState.regCompleted) {
        return (
            <ThankYou />
        )
    }

    return (
        <div className="max-w-[28.125rem] mx-auto">
            <header className="mb-9">
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-3">Finishing up</h2>
                <p className="text-base text-app_neutral-CoolGray">Double-check everything looks OK before confirming.</p>
            </header>

            <form id="stepThreeForm" onSubmit={ handleSubmit }>
                <ul className="m-0 mb-8 p-6 bg-app_neutral-Alabaster rounded-lg">
                    <li className="flex items-center justify-between pb-6 mb-5 border-b border-b-app_neutral-LightGray">
                        <div>
                            <span className="block capitalize text-primary-MarineBlue font-medium mb-[.1rem]">
                                { data.plan.name } {' '} ({ !data.billing ? 'Monthly' : 'Yearly' })
                            </span>

                            <a onClick={ handleStepChange } href="#" className="block text-app_neutral-CoolGray text-sm underline">Change</a>
                        </div>

                        <span className="text-primary-MarineBlue font-medium">${ data.plan.price }/{ !data.billing ? 'mo' : 'yr' }</span>
                    </li>

                    { Object.values(data.addons).map((addon, index) => (
                        <li className={`flex items-center justify-between text-sm ${index + 1 != Object.keys(data.addons).length ? 'mb-5' : ''}`} key={ index }>
                            <span className="text-app_neutral-CoolGray">{ addon.name }</span>
                            <span className="text-primary-MarineBlue">+${ addon.price }/{ !data.billing ? 'mo' : 'yr' }</span>
                        </li>
                    )) }
                </ul>

                <div className="flex items-end justify-between text-sm mb-10 px-6">
                    <span className="text-app_neutral-CoolGray">Total (per { !data.billing ? 'month' : 'year' })</span>
                    <span className="text-primary-PurplishBlue text-lg font-bold">+${ calcTotal() }/{ !data.billing ? 'mo' : 'yr' }</span>
                </div>
            </form>

            <footer className="flex justify-between">
                <button onClick={ handleStepBack } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-app_neutral-CoolGray bg-transparent rounded-[0.5625rem] px-6 py-3 ml-[-1.5rem]">Go Back</button>
                <button type="submit" form="stepThreeForm" className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3">Next Step</button>
            </footer>
        </div>
    );
}

export default StepFourSummary;
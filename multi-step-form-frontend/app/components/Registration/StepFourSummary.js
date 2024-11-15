import React, { useEffect, useContext, useState } from "react";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function StepFourSummary() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const [data, setData] = useState({
        name: appState.stepOne.data.name,
        email: appState.stepOne.data.email,
        phone: appState.stepOne.data.phone,
        plan: appState.stepTwo.data.plan,
        billing: !appState.stepTwo.data.billingType ? 'monthly' : 'yearly',
        addons: appState.stepThree.data
    });

    function handleSubmit(e) {
        e.preventDefault();

        // If step is not already completed
        if(!appState.stepFour.status) {
            appDispatch({ type: 'nextStep' });
            appDispatch({ type: 'stepFourStatus', value: 'completed' });
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
                                { data.plan.name } {' '} ({ data.billing })
                            </span>

                            <a onClick={ handleStepChange } href="#" className="block text-app_neutral-CoolGray text-sm underline">Change</a>
                        </div>

                        <span className="text-primary-MarineBlue font-medium">${ data.plan.price }/{ data.billing === 'monthly' ? 'mo' : 'yr' }</span>
                    </li>

                    { Object.values(data.addons).map((addon, index) => (
                        <li className="flex items-center justify-between text-sm mb-5" key={ index }>
                            <span className="text-app_neutral-CoolGray">{ addon.name }</span>
                            <span className="text-primary-MarineBlue">+${ addon.price }/{ data.billing === 'monthly' ? 'mo' : 'yr' }</span>
                        </li>
                    )) }
                </ul>
            </form>

            <footer className="flex justify-between">
                <button onClick={ handleStepBack } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-app_neutral-CoolGray bg-transparent rounded-[0.5625rem] px-6 py-3 ml-[-1.5rem]">Go Back</button>
                <button type="submit" form="stepThreeForm" className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3">Next Step</button>
            </footer>
        </div>
    );
}

export default StepFourSummary;
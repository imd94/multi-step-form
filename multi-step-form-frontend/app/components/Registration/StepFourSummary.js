import React, { useEffect, useContext, useState } from "react";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function StepFourSummary() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const validationPassed = true;

    function handleSubmit(e) {
        e.preventDefault();

        if(validationPassed) {
            // If step is not already completed
            if(!appState.stepFour.status) {
                appDispatch({ type: 'nextStep' });
                appDispatch({ type: 'stepFourStatus', value: 'completed' });
            }
        }
    }

    function handleStepBack(e) {
        e.preventDefault();
        appDispatch({ type: 'prevStep' });
    }

    return (
        <div className="max-w-[28.125rem] mx-auto">
            <header>
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-4">Finishing up</h2>
            </header>

            <footer className="flex justify-between">
                <button onClick={ handleStepBack } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-app_neutral-CoolGray bg-transparent rounded-[0.5625rem] px-6 py-3 ml-[-1.5rem]">Go Back</button>
                <button onClick={ handleSubmit } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-PurplishBlue rounded-[0.5625rem] px-6 py-3">Confirm</button>
            </footer>
        </div>
    );
}

export default StepFourSummary;
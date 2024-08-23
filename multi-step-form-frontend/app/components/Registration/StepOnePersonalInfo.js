import React, { useEffect, useContext } from "react";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function StepOnePersonalInfo() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const validationPassed = true;

    function handleSubmit(e) {
        e.preventDefault();

        // If validation passed
        if(validationPassed) {
            appDispatch({ type: 'nextStep' });
            
            // If step is not already completed
            if(!appState.stepOne.status) {
                appDispatch({ type: 'stepOneStatus', value: 'completed' });
            }
        }
    }

    return (
        <div className="max-w-[28.125rem] mx-auto">
            <header>
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-4">Personal info</h2>
            </header>

            <footer className="flex justify-between">
                <button onClick={ handleSubmit } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3">Next Step</button>
            </footer>
        </div>
    );
}

export default StepOnePersonalInfo;
import React, { useEffect, useContext } from "react";
import DispatchContext from "../../DispatchContext";

function StepTwoPlanSelect() {
    const appDispatch = useContext(DispatchContext);
    
    function handleSubmit(e) {
        e.preventDefault();
        appDispatch({ type: 'nextStep' });
    }

    function handleStepBack(e) {
        e.preventDefault();
        appDispatch({ type: 'prevStep' });
    }

    return (
        <div className="max-w-[28.125rem] mx-auto">
            <header>
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-4">Select your plan</h2>
            </header>

            <footer className="flex justify-between">
                <button onClick={ handleStepBack } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-app_neutral-CoolGray bg-transparent rounded-[0.5625rem] px-6 py-3 ml-[-1.5rem]">Go Back</button>
                <button onClick={ handleSubmit } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3">Next Step</button>
            </footer>
        </div>
    );
}

export default StepTwoPlanSelect;
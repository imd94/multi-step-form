import React, { useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function StepThreeAddons() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const [state, setState] = useImmer({
        addonOne: {
            name: 'Online service',
            description: 'Access to multiplayer games',
            price: 1,
            selected: appState.stepThree.data?.addonOne?.selected || false
        },
        addonTwo: {
            name: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            price: 2,
            selected: appState.stepThree.data?.addonTwo?.selected || false
        },
        addonThree: {
            name: 'Customizable Profile',
            description: 'Custom theme on your profile',
            price: 2,
            selected: appState.stepThree.data?.addonThree?.selected || false
        },
        stepValidationError: false, 
        submitStepCount: 0
    });

    function handleSubmit(e) {
        e.preventDefault();

        if(!state.addonOne.selected && !state.addonTwo.selected && !state.addonThree.selected) {
            setState((draft) => {
                draft.stepValidationError = true;
            });
        } else {
            setState((draft) => {
                draft.submitStepCount++;
            });
        }
    }

    function handleStepBack(e) {
        e.preventDefault();
        appDispatch({ type: 'prevStep' });
    }

    function handleAddonSelect(e) {
        const value = e.target.value;

        switch(value) {
            case 'Online service':
                setState((draft) => {
                    draft.addonOne.selected = e.target.checked;
                });
                return;
            case 'Larger storage':
                setState((draft) => {
                    draft.addonTwo.selected = e.target.checked;
                });
                return;
            case 'Customizable Profile':
                setState((draft) => {
                    draft.addonThree.selected = e.target.checked;
                });
                return;
        }
    }

    useEffect(() => {
        setState((draft) => {
            if(appState.billingYearly) {
                draft.addonOne.price = 10;
                draft.addonTwo.price = 20;
                draft.addonThree.price = 20;
            } else {
                draft.addonOne.price = 1;
                draft.addonTwo.price = 2;
                draft.addonThree.price = 2;
            }
        });
    }, [appState.billingYearly]);

    useEffect(() => {
        if(state.submitStepCount) {
            appDispatch({ type: 'nextStep' });

            const newData = {};

            if(state.addonOne.selected) {
                newData.addonOne = state.addonOne;
            } 

            if(state.addonTwo.selected) {
                newData.addonTwo = state.addonTwo;
            } 

            if(state.addonThree.selected) {
                newData.addonThree = state.addonThree;
            }
        
            // If step is not already completed
            if(!appState.stepThree.status) {
                appDispatch({ 
                    type: 'stepThreeStatus', 
                    value: 'completed', 
                    data: newData 
                });
            } else {
                appDispatch({ 
                    type: 'stepThreeData', 
                    data: newData 
                });
            }
        }
    }, [state.submitStepCount]);

    return (
        <div className="max-w-[28.125rem] h-full mx-auto relative max-xs:max-w-full max-xs:mx-0 max-xs:bg-white max-xs:px-6 max-xs:pt-8 max-xs:pb-8 max-xs:rounded-xl">
            <header className="mb-9 max-xs:mb-6">
                <h2 className="text-[2rem] leading-9 text-primary-MarineBlue font-bold mb-3 max-xs:text-[1.6rem] max-xs:mb-2">Pick add-ons</h2>
                <p className="text-base text-app_neutral-CoolGray">Add-ons help enhance your gaming experience.</p>
            </header>

            <form id="stepThreeForm" onSubmit={ handleSubmit }>
                <div className="mb-8">

                    <input onChange={ handleAddonSelect } checked={ state.addonOne.selected } className="peer/online-service-addon hidden" type="checkbox" id="online-service-addon" name="online-service" value={ state.addonOne.name } />
                    <label className="grid grid-cols-[1.25rem_1fr_min-content] items-center gap-6 p-5 mb-4 border border-app_neutral-LightGray rounded-[.65rem] transition-all peer-checked/online-service-addon:border-primary-PurplishBlue peer-checked/online-service-addon:bg-app_neutral-Alabaster max-xs:p-4 max-xs:py-3 max-sm:gap-4" htmlFor="online-service-addon">
                        <span className={ `flex justify-center items-center text-center border rounded w-5 h-5 transition-all ${state.addonOne.selected ? 'bg-primary-PurplishBlue border-primary-PurplishBlue' : 'bg-transparent border-app_neutral-LightGray'}` }>
                            <svg className={ `flex transition-all ${state.addonOne.selected ? 'visible opacity-100' : 'invisible opacity-0'}` } xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><path fill="none" stroke="#FFF" strokeWidth="2" d="m1 4 3.433 3.433L10.866 1"/></svg>
                        </span>

                        <span>
                            <span className="block text-primary-MarineBlue font-medium max-sm:text-sm">{ state.addonOne.name }</span>
                            <span className="block text-app_neutral-CoolGray text-sm max-sm:text-xs">{ state.addonOne.description }</span>
                        </span>

                        <span className="block text-sm text-primary-PurplishBlue max-xs:text-xs">
                            +${ state.addonOne.price }/{ `${!appState.billingYearly ? 'mo' : 'yr'}` }
                        </span>
                    </label>

                    <input onChange={ handleAddonSelect } checked={ state.addonTwo.selected } className="peer/larger-storage-addon hidden" type="checkbox" id="larger-storage-addon" name="larger-storage" value={ state.addonTwo.name } />
                    <label className="grid grid-cols-[1.25rem_1fr_min-content] items-center gap-6 p-5 mb-4 border border-app_neutral-LightGray rounded-[.65rem] transition-all peer-checked/larger-storage-addon:border-primary-PurplishBlue peer-checked/larger-storage-addon:bg-app_neutral-Alabaster max-xs:p-4 max-xs:py-3 max-sm:gap-4" htmlFor="larger-storage-addon">
                        <span className={ `flex justify-center items-center text-center border rounded w-5 h-5 transition-all ${state.addonTwo.selected ? 'bg-primary-PurplishBlue border-primary-PurplishBlue' : 'bg-transparent border-app_neutral-LightGray'}` }>
                            <svg className={ `flex transition-all ${state.addonTwo.selected ? 'visible opacity-100' : 'invisible opacity-0'}` } xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><path fill="none" stroke="#FFF" strokeWidth="2" d="m1 4 3.433 3.433L10.866 1"/></svg>
                        </span>

                        <span>
                            <span className="block text-primary-MarineBlue font-medium max-sm:text-sm">{ state.addonTwo.name }</span>
                            <span className="block text-app_neutral-CoolGray text-sm max-sm:text-xs">{ state.addonTwo.description }</span>
                        </span>

                        <span className="block text-sm text-primary-PurplishBlue max-xs:text-xs">
                            +${ state.addonTwo.price }/{ `${!appState.billingYearly ? 'mo' : 'yr'}` }
                        </span>
                    </label>

                    <input onChange={ handleAddonSelect } checked={ state.addonThree.selected } className="peer/customizable-profile-addon hidden" type="checkbox" id="customizable-profile-addon" name="customizable-profile" value={ state.addonThree.name } />
                    <label className="grid grid-cols-[1.25rem_1fr_min-content] items-center gap-6 p-5 border border-app_neutral-LightGray rounded-[.65rem] transition-all peer-checked/customizable-profile-addon:border-primary-PurplishBlue peer-checked/customizable-profile-addon:bg-app_neutral-Alabaster max-xs:p-4 max-xs:py-3 max-sm:gap-4" htmlFor="customizable-profile-addon">
                        <span className={ `flex justify-center items-center text-center border rounded w-5 h-5 transition-all ${state.addonThree.selected ? 'bg-primary-PurplishBlue border-primary-PurplishBlue' : 'bg-transparent border-app_neutral-LightGray'}` }>
                            <svg className={ `flex transition-all ${state.addonThree.selected ? 'visible opacity-100' : 'invisible opacity-0'}` } xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><path fill="none" stroke="#FFF" strokeWidth="2" d="m1 4 3.433 3.433L10.866 1"/></svg>
                        </span>

                        <span>
                            <span className="block text-primary-MarineBlue font-medium max-sm:text-sm">{ state.addonThree.name }</span>
                            <span className="block text-app_neutral-CoolGray text-sm max-sm:text-xs">{ state.addonThree.description }</span>
                        </span>

                        <span className="block text-sm text-primary-PurplishBlue max-xs:text-xs">
                            +${ state.addonThree.price }/{ `${!appState.billingYearly ? 'mo' : 'yr'}` }
                        </span>
                    </label>

                    { state.stepValidationError && <span className="block text-validation-danger-val-text text-sm my-2">You must select at least one addon!</span> }
                </div>
            </form>

            <footer className="flex justify-between w-full max-xs:fixed max-xs:bottom-0 max-xs:left-0 max-xs:bg-white max-xs:p-4">
                <button onClick={ handleStepBack } className="text-[1.0625rem] tracking-[-0.025em] font-medium text-app_neutral-CoolGray bg-transparent rounded-[0.5625rem] px-6 py-3 ml-[-1.5rem]">Go Back</button>
                <button type="submit" form="stepThreeForm" className="text-[1.0625rem] tracking-[-0.025em] font-medium text-white bg-primary-MarineBlue rounded-[0.5625rem] px-6 py-3">Next Step</button>
            </footer>
        </div>
    );
}

export default StepThreeAddons;
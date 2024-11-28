import React, { useEffect, useContext } from "react";
import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

function SidebarNavItem(props) {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    return (
        <li onClick={ (e) => appDispatch({ type: 'updateCurrentStep', value: props.stepNum }) } 
            className={`
            flex items-center gap-x-4 cursor-pointer
            ${ !props.stepCompleted && localStorage.getItem('stepNum') != props.stepNum ? 'pointer-events-none' : '' }
            ${ appState.regCompleted && 'pointer-events-none' }
        `}>
            <div className={`flex items-center justify-center text-center w-[2.1875rem] h-[2.1875rem] border rounded-full ${ props.stepActive ? 'border-primary-LightBlue text-primary-MarineBlue bg-primary-LightBlue' : 'border-app_neutral-LightGray text-white bg-transparent' }`}>
                { !props.stepCompleted ? props.stepNum :
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill={ !props.stepActive ? '#fff' : '#02295a' }><path d="M379.33-244 154-469.33 201.67-517l177.66 177.67 378.34-378.34L805.33-670l-426 426Z"/></svg> }
            </div>

            <div className="flex flex-col items-start gap-y-2 uppercase max-xs:hidden">
                <span className="block leading-[1] text-xs text-app_neutral-LightGray">Step { props.stepNum }</span>
                <span className="block leading-[1] text-sm font-medium text-white">{ props.stepTitle }</span>
            </div>
        </li>
    );
}

export default SidebarNavItem;
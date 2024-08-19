import React, { useEffect, useContext } from "react";
import StateContext from "../../StateContext";

function SidebarNavItem(props) {
    const appState = useContext(StateContext);

    return (
        <li className="flex items-center gap-x-4 cursor-pointer">
            <div className={`flex items-center justify-center text-center w-[2.1875rem] h-[2.1875rem] border rounded-full ${ props.stepActive ? 'border-primary-LightBlue text-primary-MarineBlue bg-primary-LightBlue' : 'border-app_neutral-LightGray text-white bg-transparent' }`}>
                { props.stepNum }
            </div>

            <div className="flex flex-col items-start gap-y-2 uppercase">
                <span className="block leading-[1] text-xs text-app_neutral-LightGray">Step { props.stepNum }</span>
                <span className="block leading-[1] text-sm font-medium text-white">{ props.stepTitle }</span>
            </div>
        </li>
    );
}

export default SidebarNavItem;
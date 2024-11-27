import React, { useEffect, useContext } from "react";

import SidebarNavItem from "./SidebarNavItem";
import StateContext from "../../StateContext";

function SidebarNav() {
    const appState = useContext(StateContext); 

    return (
        <ul className="list-none p-0 m-0 flex flex-col items-start gap-y-8">
            <SidebarNavItem 
                stepNum="1"
                stepTitle="Your info"
                stepActive={ appState.stepCounter == 1 && true }
                stepCompleted={ appState.stepOne.status }
            />

            <SidebarNavItem 
                stepNum="2"
                stepTitle="Select plan"
                stepActive={ appState.stepCounter == 2 && true }
                stepCompleted={ appState.stepTwo.status }
            />

            <SidebarNavItem 
                stepNum="3"
                stepTitle="Add-ons"
                stepActive={ appState.stepCounter == 3 && true }
                stepCompleted={ appState.stepThree.status }
            />

            <SidebarNavItem 
                stepNum="4"
                stepTitle="Summary"
                stepActive={ ( appState.stepCounter == 4 || appState.stepFour.status || appState.regCompleted) && true  }
                stepCompleted={ appState.stepFour.status }
            />
        </ul>
    );
}

export default SidebarNav;
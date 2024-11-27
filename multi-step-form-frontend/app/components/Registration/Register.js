import React, { useEffect, useContext } from "react";

import StateContext from "../../StateContext";
import SidebarNav from "./SidebarNav";
import StepOnePersonalInfo from "./StepOnePersonalInfo";
import StepTwoPlanSelect from "./StepTwoPlanSelect";
import StepThreeAddons from "./StepThreeAddons";
import StepFourSummary from "./StepFourSummary";
import ThankYou from "./ThankYou";

function Register() {
    const appState = useContext(StateContext);

    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-primary-BackgroundBlue grid items-center">
            <h1 className="hidden screen-reader-only">Registration process</h1>
            <div className="p-[0.9375rem]">
                <div className="max-w-[58.75rem] min-h-[37.5rem] mx-auto rounded-2xl bg-white p-4 grid grid-cols-[minmax(13.75rem,_17.1875rem)_minmax(17.1875rem,_100%)] gap-4">
                    <aside className="grid grid-rows-[auto] rounded-xl overflow-hidden">
                        <img className="block w-full h-full object-cover col-[1_/_-1] row-[1_/_-1] z-1" src="./assets/images/bg-sidebar-desktop.svg" alt="Sidebar backround image" />

                        <div className="col-[1_/_-1] row-[1_/_-1] z-2 p-4 py-10 px-8">
                            <h2 className="hidden screen-reader-only">Sidebar steps</h2>

                            <SidebarNav />
                        </div>
                    </aside>

                    <article className={`${!appState.regCompleted ? 'pt-10 pb-5' : ''} `}>
                        { appState.stepCounter == 1 && <StepOnePersonalInfo /> }
                        { appState.stepCounter == 2 && <StepTwoPlanSelect /> }
                        { appState.stepCounter == 3 && <StepThreeAddons /> }
                        { (appState.stepCounter == 4 || appState.regCompleted) && <StepFourSummary /> }
                        {/* { ( appState.stepFour.status && appState.regCompleted ) && <ThankYou /> } */}
                    </article>
                </div>
            </div>
        </section>
    );
}

export default Register;
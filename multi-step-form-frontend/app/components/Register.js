import React, { useEffect } from "react";

function Register() {
    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-primary-BackgroundBlue grid items-center">
            <h1 className="hidden screen-reader-only">Registration process</h1>
            <div className="p-[0.9375rem]">
                <div className="max-w-[58.75rem] mx-auto rounded-2xl bg-white p-4">
                    <div className="grid grid-cols-[minmax(15.3125rem,_17.1875rem)_minmax(17.1875rem,_100%)]">
                        <aside className="grid grid-rows-[min-content_min-content] rounded-xl">
                            <img className="block w-full h-full object-cover col-[1_/_1] row-[1_/_1] z-1" src="./assets/images/bg-sidebar-desktop.svg" alt="Sidebar backround image" />

                            <div className="col-[1_/_1] row-[1_/_1] z-2 p-4 py-10 px-8">
                                <h2 className="hidden screen-reader-only">Sidebar steps</h2>

                                <ul className="list-none p-0 m-0 flex flex-col items-start gap-y-8">
                                    <li className="flex items-center gap-x-4">
                                        <div className="flex items-center justify-center text-center w-[2.1875rem] h-[2.1875rem] border border-app_neutral-LightGray rounded-full text-white bg-transparent">
                                            1
                                        </div>

                                        <div className="flex flex-col items-start gap-y-2 uppercase">
                                            <span className="block leading-[1] text-xs text-app_neutral-LightGray">Step 1</span>
                                            <span className="block leading-[1] text-sm font-medium text-white">Your info</span>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-x-4">
                                        <div className="flex items-center justify-center text-center w-[2.1875rem] h-[2.1875rem] border border-app_neutral-LightGray rounded-full text-white bg-transparent">
                                            2
                                        </div>

                                        <div className="flex flex-col items-start gap-y-2 uppercase">
                                            <span className="block leading-[1] text-xs text-app_neutral-LightGray">Step 2</span>
                                            <span className="block leading-[1] text-sm font-medium text-white">Select plan</span>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-x-4">
                                        <div className="flex items-center justify-center text-center w-[2.1875rem] h-[2.1875rem] border border-app_neutral-LightGray rounded-full text-white bg-transparent">
                                            3
                                        </div>

                                        <div className="flex flex-col items-start gap-y-2 uppercase">
                                            <span className="block leading-[1] text-xs text-app_neutral-LightGray">Step 3</span>
                                            <span className="block leading-[1] text-sm font-medium text-white">Add-ons</span>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-x-4">
                                        <div className="flex items-center justify-center text-center w-[2.1875rem] h-[2.1875rem] border border-app_neutral-LightGray rounded-full text-white bg-transparent">
                                            4
                                        </div>

                                        <div className="flex flex-col items-start gap-y-2 uppercase">
                                            <span className="block leading-[1] text-xs text-app_neutral-LightGray">Step 4</span>
                                            <span className="block leading-[1] text-sm font-medium text-white">Summary</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </aside>

                        <article className="">

                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
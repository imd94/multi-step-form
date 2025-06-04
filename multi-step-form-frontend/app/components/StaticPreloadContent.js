import React, { useEffect } from "react";

import LoaderSpinner from "./LoaderSpinner";

function StaticPreloadContent() {
    return (
        <div className="static-preload-content">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <LoaderSpinner />  
          </div> 
        </div>
    );
}

export default StaticPreloadContent;
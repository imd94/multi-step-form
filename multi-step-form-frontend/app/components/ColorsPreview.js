import React, { useEffect } from "react";

function ColorsPreview() {
    return (
        <>
            {/* Primary colors */}
            <div 
            className="
                hidden
                text-primary-MarineBlue
                text-primary-PurplishBlue
                text-primary-PastelBlue
                text-primary-LightBlue
                text-primary-StrawberryRed
                text-primary-BackgroundBlue
            ">
            </div>

            {/* Neutral colors */}
            <div 
            className="
                text-app_neutral-CoolGray
                text-app_neutral-LightGray
                text-app_neutral-Magnolia
                text-app_neutral-Alabaster
            ">
            </div>

            {/* Status colors */}
            <div 
            className="
                text-status-success
                text-status-danger
                text-status-warning
                text-status-info
            ">
            </div>
        </>   
    );
}

export default ColorsPreview;
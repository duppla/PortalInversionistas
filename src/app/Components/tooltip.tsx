import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

interface TooltipButtonProps {
    buttonText: string;
    tooltipText: string;
    color?: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ buttonText, tooltipText, color = "futuro" }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    const showTooltipMobile = () => {
        if (window.innerWidth < 768) {
            setShowTooltip(true);
        }
    };

    const hideTooltipMobile = () => {
        if (window.innerWidth < 768) {
            setShowTooltip(false);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={toggleTooltip}
                onMouseEnter={!showTooltip ? () => setShowTooltip(true) : undefined}
                onMouseLeave={!showTooltip ? () => setShowTooltip(false) : undefined}
                onTouchStart={showTooltipMobile}
                onTouchEnd={hideTooltipMobile}
                className="focus:outline-none"
            >
                <InformationCircleIcon className={`h-4 w-4 text-${color} hover:text-${color}-800`} />
            </button>
            {showTooltip && (
                <div
                    className={`absolute top-0 left-4 z-10 p-2 text-sm font-medium text-${color} bg-white rounded-lg shadow-lg`}
                >
                    {tooltipText}
                </div>
            )}
        </div>
    );
};

export default TooltipButton;

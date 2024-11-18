// components/ElfsightWidget.js
'use client'
import { useEffect } from 'react';

const ElfsightWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.setAttribute('data-use-service-core', '');
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="elfsight-app-fa38e882-2136-4654-aa6b-127994e44e6e" data-elfsight-app-lazy></div>
    );
};

export default ElfsightWidget;

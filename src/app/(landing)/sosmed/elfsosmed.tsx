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
        <div className="elfsight-app-1c03bebb-d565-4cb8-aec6-cbf73d3be970" data-elfsight-app-lazy></div>
    );
};

export default ElfsightWidget;

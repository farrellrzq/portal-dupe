'use client';
import { useEffect } from 'react';

const ElfsightWidget = () => {
    useEffect(() => {
        console.log('[Elfsight] Injecting script...');
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.setAttribute('data-use-service-core', '');
        script.defer = true;

        script.onload = () => console.log('[Elfsight] Script loaded');
        script.onerror = () => console.error('[Elfsight] Script failed to load');

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="elfsight-app-12e7d545-07f0-457e-b16f-aa9ac47b7ee9" data-elfsight-app-lazy></div>
    );
};

export default ElfsightWidget;

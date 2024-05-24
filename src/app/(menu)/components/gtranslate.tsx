'use client'
import { useEffect } from 'react';

const GTranslate = () => {
    useEffect(() => {
        // Menginisialisasi window.gtranslateSettings jika belum terdefinisi
        if (!(window as any).gtranslateSettings) {
            (window as any).gtranslateSettings = {
                default_language: 'id',
                detect_browser_language: true,
                languages: ['id', 'en'],
                wrapper_selector: '.gtranslate_wrapper',
                switcher_horizontal_position: 'right',
                float_switcher_open_direction: 'bottom'
            };

            // Memuat skrip JavaScript
            const script = document.createElement('script');
            script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                // Membersihkan skrip saat komponen tidak lagi digunakan
                document.body.removeChild(script);
            };
        }
    }, []);

    return <div className="gtranslate_wrapper"></div>;
};

export default GTranslate;

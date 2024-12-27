'use client';
import { useEffect } from 'react';

const GTranslate = () => {
    useEffect(() => {
        // Pastikan hanya satu instance pengaturan GTranslate
        if (!(window as any).gtranslateSettings) {
            (window as any).gtranslateSettings = {
                default_language: 'id',
                // detect_browser_language: true,
                languages: ['id', 'en'],
                wrapper_selector: '.gtranslate_wrapper',
                switcher_horizontal_position: 'right', // Posisi horizontal switcher
                float_switcher_open_direction: 'bottom' // Arah dropdown switcher
            };

            // Tambahkan script widget GTranslate
            const script = document.createElement('script');
            script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
            script.async = true;
            document.body.appendChild(script);

            // Bersihkan script saat komponen dihapus
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    // Sinkronisasi untuk memastikan bahasa default ke Indonesia dan bendera sesuai
    useEffect(() => {
        const interval = setInterval(() => {
            const translateEvent = (window as any).GTranslateEvent;

            if (translateEvent && translateEvent.translate) {
                // Paksa widget untuk menggunakan bahasa Indonesia
                translateEvent.translate('id');

                // Pastikan bendera default mengikuti bahasa Indonesia
                const flag = document.querySelector('.gtranslate_wrapper select');
                if (flag) {
                    (flag as HTMLSelectElement).value = 'id'; // Set default value
                    flag.dispatchEvent(new Event('change')); // Trigger perubahan
                }

                clearInterval(interval); // Hentikan interval setelah berhasil
            }
        }, 100); // Cek setiap 100ms sampai widget tersedia

        return () => clearInterval(interval);
    }, []);

    return <div className="gtranslate_wrapper"></div>;
};

export default GTranslate;

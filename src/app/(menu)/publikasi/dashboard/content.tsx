'use client'
import { CmsContentProps } from "@/controllers/types/controller.type";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        tableau: any;
        viz: any;
    }
}

export default function Dashboard({ Dashboard }: { Dashboard: CmsContentProps[] | null }) {
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null); // State untuk menyimpan URL yang dipilih

    useEffect(() => {
        if (selectedUrl) {
            // Tambahkan script Tableau API secara dinamis
            const script = document.createElement('script');
            script.src = 'https://public.tableau.com/javascripts/api/tableau-2.8.0.min.js';
            script.onload = () => {
                const containerDiv = document.getElementById('tableauViz');
                const options = {
                    hideTabs: true,
                    width: '100%',
                    height: '600px',
                };
                if (window.tableau) {
                    // Dispose viz yang ada sebelum membuat yang baru
                    if (window.viz) {
                        window.viz.dispose();
                    }
                    window.viz = new window.tableau.Viz(containerDiv, selectedUrl, options);
                }
            };
            document.body.appendChild(script);
        }
    }, [selectedUrl]);

    // Fungsi untuk menangani klik tombol "Lihat"
    const handleViewClick = (url: string | null) => {
        setSelectedUrl(url); // Perbarui URL untuk menampilkan iframe
    };

    return (
        <section className="lg:py-24 lg:px-20 pb-5 bg-teal-50 dark:bg-jacarta-800">
            {/* Konten Iframe akan ditampilkan di bawah tabel */}
            <div className="bg-white px-8 py-2 rounded">
                {selectedUrl && (
                    <div id="tableauViz" style={{ maxWidth: '100%', height: '600px', margin: '20px auto', overflow: 'auto' }}></div>
                )}
            </div>
            <div className="bg-white px-8 pt-2 pb-8 rounded">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title Menu</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th> {/* Kolom Action */}
                        </tr>
                    </thead>
                    <tbody>
                        {Dashboard && Dashboard.map((item) => (
                            <tr key={item.content_id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.title}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button 
                                        className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleViewClick(item.urlcontent)} 
                                        style={{ padding: '4px 8px', cursor: 'pointer' }}
                                    >
                                        Lihat
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

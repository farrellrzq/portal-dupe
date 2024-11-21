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
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null); // State for the selected URL

    // If there's any dashboard content, set the latest item as selected
    useEffect(() => {
        if (Dashboard && Dashboard.length > 0) {
            const latestUrl = Dashboard[0].urlcontent; // Assuming the first item is the latest
            setSelectedUrl(latestUrl);
        }
    }, [Dashboard]);

    useEffect(() => {
        if (selectedUrl) {
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
                    if (window.viz) {
                        window.viz.dispose();
                    }
                    window.viz = new window.tableau.Viz(containerDiv, selectedUrl, options);
                }
            };
            document.body.appendChild(script);
        }
    }, [selectedUrl]);

    return (
        <section className="lg:py-24 lg:px-20 pb-5 bg-amber-50 dark:bg-jacarta-800">
            {/* Display the iframe content directly */}
            <div className="bg-white px-8 py-2 rounded">
                {selectedUrl ? (
                    <div id="tableauViz" style={{ maxWidth: '100%', height: '600px', margin: '20px auto', overflow: 'auto' }}></div>
                ) : (
                    <p>No content available</p>
                )}
            </div>

            {/* Display a link to the latest API content */}
            {/* <div className="bg-white px-8 pt-2 pb-8 rounded">
                {selectedUrl && (
                    <p>
                        Latest Dashboard:{" "}
                        <a href={selectedUrl} target="_blank" className="text-teal-600 underline">
                            View Dashboard
                        </a>
                    </p>
                )}
            </div> */}
        </section>
    );
}

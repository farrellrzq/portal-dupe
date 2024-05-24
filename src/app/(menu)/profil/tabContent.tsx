'use client'

import React, { useEffect } from "react";

export default function Tabcontent() {

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.classList.add('show', 'active');
            }
        }
        const hashnew = window.location.hash;
        const idElement = `${hashnew}-tab`
        if (idElement) {
            const btn = document.querySelector(idElement);
            if (btn) {
                console.log(btn);
                btn.classList.add('active')
            }
        }

    }, []);

    return (
        <div>
            <ul
                className="nav nav-tabs justify-center scrollbar-custom mb-12 lg:mb-0 flex items-centert overflow-x-auto overflow-y-hidden border-jacarta-100 dark:border-jacarta-600"
                role="tablist">
                <li className="nav-item" role="presentation">
                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="tentang-kami-tab" data-bs-toggle="tab" data-bs-target="#tentang-kami" type="button" role="tab"
                            aria-controls="tentang-kami" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>


                            <div>
                                <span
                                    className="font-display font-semibold text-jacarta-700 dark:text-white">Tentang</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
                <li className="nav-item" role="presentation">

                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="visi-tab" data-bs-toggle="tab" data-bs-target="#visi" type="button" role="tab"
                            aria-controls="visi" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>

                            <div>
                                <span className="font-display font-semibold text-jacarta-700 hover:text-white dark:text-white">Visi &
                                    Misi</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
                <li className="nav-item" role="presentation">
                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="landasan-tab" data-bs-toggle="tab" data-bs-target="#landasan" type="button" role="tab"
                            aria-controls="landasan" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>


                            <div>
                                <span className="font-display font-semibold text-jacarta-700 hover:text-white dark:text-white">Landasan Hukum</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
                <li className="nav-item" role="presentation">
                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="struktur-tab" data-bs-toggle="tab" data-bs-target="#struktur" type="button" role="tab"
                            aria-controls="struktur" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>

                            <div>
                                <span className="font-display font-semibold text-jacarta-700 hover:text-white dark:text-white">Struktur
                                    Organisasi</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
                <li className="nav-item" role="presentation">
                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="tupoksi-tab" data-bs-toggle="tab" data-bs-target="#tupoksi" type="button" role="tab"
                            aria-controls="tupoksi" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>

                            <div>
                                <span className="font-display font-semibold text-jacarta-700 hover:text-white dark:text-white">Tugas
                                    Pokok</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
                <li className="nav-item" role="presentation">
                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="maklumat-tab" data-bs-toggle="tab" data-bs-target="#maklumat" type="button" role="tab"
                            aria-controls="maklumat" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>

                            <div>
                                <span className="font-display font-semibold text-jacarta-700 hover:text-white dark:text-white">Maklumat</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
                <li className="nav-item" role="presentation">
                    <div
                        className="nav-link mr-2 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap pr-3 pl-3 py-3 hover:border-transparent hover:bg-green-600 hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-green-600">
                        <button
                            className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-white dark:hover:text-white"
                            id="motto-tab" data-bs-toggle="tab" data-bs-target="#motto" type="button" role="tab"
                            aria-controls="motto" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mb-1 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>

                            <div>
                                <span className="font-display font-semibold text-jacarta-700 hover:text-white dark:text-white">Motto</span>
                                <span className="text-sm dark:text-jacarta-300">
                                    <div className="date"></div>
                                </span>
                            </div>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

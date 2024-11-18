'use client'
import { PotensiProps } from '@/controllers/types/home-controller.type';
import React, { useState } from 'react'

export default function Content({ potensi }: { potensi: PotensiProps[] | null }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Misalnya, 10 item per halaman

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
    };

    // Filter dokumen berdasarkan nilai pencarian
    const filteredGaleri = potensi && potensi.filter((item: any) => {
        return item.Nama.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
    const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan

    // pagination galeri

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = filteredGaleri ? Math.min(startPage + maxButtons - 1, Math.ceil(filteredGaleri.length / itemsPerPage)) : 0;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGaleri = filteredGaleri ? filteredGaleri.slice(indexOfFirstItem, indexOfLastItem) : [];

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="container">
            <div className="scrollbar-custom overflow-x-auto rounded-lg">
                <div className="min-w-fit">
                    <div className="flex">
                        <div className="ml-auto w-4/12 lg:w-1/4 my-6">
                            <form action="search" className="relative basis-3/12">
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                                    placeholder="Search"
                                />
                                <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                        className="h-4 w-4 fill-jacarta-500 dark:fill-white">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path
                                            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                                    </svg>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
                {currentGaleri.map((item: any, index: number) => (
                    <article key={index}>
                        <div className="rounded-2.5xl hover:relative hover:bottom-6 border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                            <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target={`.video-lightbox-${item.Id}`}
                                target="_blank"
                            >
                                <img
                                    src={item.Image
                                        ? `https://cms.depok.go.id/upload/place/${item.Image}`
                                        : "/img/kecamatan/dsw/kesehatan.png"
                                    }
                                    alt="item 1"
                                    className="w-full h-32 object-cover rounded-[0.625rem]"
                                    loading="lazy"
                                />
                            </a>

                            <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target={`.video-lightbox-${item.Id}`}
                                target="_blank"
                                className="mt-5 mb-2 flex items-center font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
                            >
                                {item.Nama ? item.Nama : ""}
                                <div
                                    className="flex h-[1.125rem] w-[1.125rem] ml-1 mb-px items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                                    data-tippy-content="Verified Collection"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="h-[.875rem] w-[.875rem] fill-white"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                    </svg>
                                </div>
                            </a>
                            <div className="flex">
                                <a
                                    href={`https://www.google.co.id/maps/?q=${item["Alamat"]}/${item["Lat"]},${item["Lng"]}`}
                                    target="_blank"
                                    className="rounded-md bg-accent p-1.5 px-4 m-1 flex text-center items-center text-xs font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-1"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                        />
                                    </svg>
                                    Maps
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 my-5 bg-white px-4 py-3 sm:px-6 dark:border-jacarta-700 dark:bg-jacarta-700">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 dark:text-white">
                            Showing
                            <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
                            to
                            <span className="font-medium mx-1">
                                {indexOfLastItem > (filteredGaleri?.length ?? 0) ? (filteredGaleri?.length ?? 0) : indexOfLastItem}
                            </span>
                            of
                            <span className="font-medium mx-1">{filteredGaleri?.length ?? 0}</span>
                            results
                        </p>
                    </div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))} // Fungsi untuk halaman sebelumnya
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'hidden' : ''
                                }`}
                        >
                            <span className="sr-only">Previous</span>
                            Prev
                        </button>
                        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                            const pageNumber = startPage + index;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => paginate(pageNumber)}
                                    className={`relative dark:text-white inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => paginate(Math.min(endPage + 1, Math.ceil((filteredGaleri?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${indexOfLastItem >= (filteredGaleri?.length ?? 0) ? 'hidden' : ''
                                }`}
                        >
                            <span className="sr-only">Next</span>
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

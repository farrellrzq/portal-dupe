'use client'
import React, { useState } from 'react'
import { LandasanProps } from '@/controllers/types/profil-controller.type';

export default function ContentLandasan({ landasan }: { landasan: LandasanProps[] | null }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Misalnya, 10 item per halaman

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
    };

    // Filter dokumen berdasarkan nilai pencarian
    const filtered = landasan && landasan.filter((item: any) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
    const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan

    // pagination galeri

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = filtered ? Math.min(startPage + maxButtons - 1, Math.ceil(filtered.length / itemsPerPage)) : 0;


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPages = filtered ? filtered.slice(indexOfFirstItem, indexOfLastItem) : [];

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div
            className="flex flex-wrap rounded-t-[15rem] bg-white dark:bg-jacarta-700 md:flex-nowrap md:space-x-8 md:p-[4.25rem] lg:space-x-16">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="w-full">
                        <div className="p-4 border-b border-gray-200 shadow">
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
                            <table id="basic-2" className="p-4 dark:text-jacarta-300 w-[20rem] lg:w-full">
                                <thead className="dark:text-jacarta-300">
                                    <tr>
                                        <th className="p-8 text-xs ">
                                            No
                                        </th>
                                        <th className="p-8 text-xs ">
                                            Dokumen
                                        </th>
                                        <th className="p-8 text-xs ">
                                            Download
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-jacarta-300 dark:bg-dark-50">
                                    {currentPages.map((item: any, index: number) => {
                                        // Check if item.uploaddokumen is not null before splitting
                                        const fileExtension = item.uploaddokumen ? item.uploaddokumen.split('.').pop() : null;

                                        // Fungsi untuk menentukan jenis file berdasarkan ekstensi
                                        const getFileType = (extension: string) => {
                                            if (extension === 'pdf') {
                                                return 'PDF';
                                            } else if (extension === 'doc' || extension === 'docx') {
                                                return 'Word';
                                            } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                return 'Image';
                                            } else {
                                                return 'File'; // Untuk jenis file lainnya
                                            }
                                        };

                                        return (
                                            <tr className="whitespace-nowrap" key={index}>
                                                <td className="px-6 py-4 text-sm text-center dark:text-light">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-start">
                                                    <div className="text-base dark:text-light">
                                                        {item?.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-start">
                                                    <a href={`https://cms.depok.go.id/upload/file/${item.uploaddokumen}`} target="_blank" download>
                                                        <div className="flex place-content-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 mr-2 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                                            </svg>
                                                            <p className="text-base dark:text-light">
                                                                {fileExtension ? getFileType(fileExtension) : 'No File'}
                                                            </p>
                                                        </div>
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="flex items-center justify-between border-t border-gray-200 my-5 bg-white px-4 py-3 sm:px-6 dark:border-jacarta-700 dark:bg-jacarta-700">
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-white">
                                            Showing
                                            <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
                                            to
                                            <span className="font-medium mx-1">
                                                {indexOfLastItem > (filtered?.length ?? 0) ? (filtered?.length ?? 0) : indexOfLastItem}
                                            </span>
                                            of
                                            <span className="font-medium mx-1">{filtered?.length ?? 0}</span>
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
                                            onClick={() => paginate(Math.min(endPage + 1, Math.ceil((filtered?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
                                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${indexOfLastItem >= (filtered?.length ?? 0) ? 'hidden' : ''
                                                }`}
                                        >
                                            <span className="sr-only">Next</span>
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'
import React, { useState } from 'react'
import { LandasanProps } from '@/controllers/types/profil-controller.type';
import { DomainSiteProps } from '@/controllers/types/controller.type';

export default function ContentStruktur({ pegawai }: { pegawai: LandasanProps[] | null }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Misalnya, 10 item per halaman

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
    };

    // Filter dokumen berdasarkan nilai pencarian   
    const filtered = pegawai 
    ? pegawai.filter((item: any) => {
        return item?.jabatan?.toLowerCase().includes(searchTerm.toLowerCase());
    }) 
    : [];

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
        <div className="rounded-t-[15rem] bg-white dark:bg-jacarta-700 md:p-[4.25rem]">
            <div className="container mx-auto">
                <div className="w-full">
                    <div className="border-b border-gray-600 shadow">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-6 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <div className="ml-auto w-4/12 lg:w-1/4 my-6">
                                            <form action="search" className="relative basis-3/12">
                                                <input
                                                    type="search"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                                                    placeholder="Cari Berdasarkan Jabatan"
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
                                        <table className="border dark:border-gray-600 dark:text-jacarta-300 w-full mt-5" id="basic-1">
                                            <thead className="dark:text-jacarta-300">
                                                <tr className="border-b dark:border-gray-600">
                                                    <th scope="col" className="text-base dark:text-light px-6 py-4">
                                                        Nama Pegawai
                                                    </th>
                                                    <th scope="col" className="text-base dark:text-light px-6 py-4">
                                                        Jabatan
                                                    </th>
                                                    <th scope="col" className="text-base dark:text-light px-6 py-4">
                                                        Foto Pegawai
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="dark:text-jacarta-300 dark:bg-dark-50">
                                                {currentPages.map((item: any, index: number) => {
                                                    return (
                                                        <tr className="border-b dark:border-gray-600 transition duration-300 ease-in-out dark:hover:bg-dark-500" key={index}>
                                                            <td className="text-base dark:text-light px-6 py-4 whitespace-nowrap border-b dark:border-gray-600">
                                                                {item.nama_pegawai}
                                                            </td>
                                                            <td className="text-base dark:text-light px-6 py-4 whitespace-nowrap border-b dark:border-gray-600">
                                                                {item.jabatan.slice(0, 50)}
                                                            </td>
                                                            <a href=""
                                                                // onClick={() => displayIframe(item.URL)}
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`.video-lightbox-${item.nip}`}
                                                                target="_blank"
                                                            >
                                                                <button
                                                                    className="group mr-2.5 inline-flex items-center rounded-xl bg-white px-4 py-3 hover:border-transparent hover:bg-blue hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-blue">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye me-2" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                    <span className="text-2xs font-medium">Lihat</span>
                                                                </button>
                                                            </a>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        {currentPages.map((item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`modal fade video-lightbox js-video-lightbox video-lightbox-${item.nip}`} // Menggunakan kelas CSS
                                                    tabIndex={-1}
                                                    aria-hidden="true"
                                                >
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-body">
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        width="24"
                                                                        height="24"
                                                                        className="h-6 w-6 fill-jacarta-700"
                                                                    >
                                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                                        <path
                                                                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <div className="rounded-2.5xl bg-white p-12 dark:bg-jacarta-700">
                                                                    <div
                                                                        className="flex rounded-2.5xl bg-white p-8 dark:bg-jacarta-700"
                                                                    >
                                                                        <img
                                                                            src={`https://dsw.depok.go.id/assets/photo/${item.nip}.jpg`}
                                                                            alt="author"
                                                                            className="mr-4 h-16 w-16 object-cover shrink-0 self-start rounded-lg md:mr-8 md:h-[11rem] md:w-[11rem]"
                                                                            loading="lazy"
                                                                        />
                                                                        <div>
                                                                            <span className="mb-3 mt-2 block font-display text-base text-jacarta-700 dark:text-white">{item.nama_pegawai}</span>
                                                                            <p className="mb-4 dark:text-jacarta-300">
                                                                                {item.jabatan}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

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
                </div>
            </div>
        </div>
    )
}

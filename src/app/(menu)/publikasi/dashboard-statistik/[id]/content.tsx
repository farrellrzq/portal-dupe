'use client'
import { AgendaProps } from '@/controllers/types/publikasi-controller.type';
import React, { useState } from 'react'

export default function Content({ detailDashboardStatistik }: { detailDashboardStatistik: AgendaProps[] | null}) {    
    
    return JSON.stringify ( detailDashboardStatistik )
    console.log(detailDashboardStatistik);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [selectedCategory, setSelectedCategory] = useState('');
  
    const filteredStatistik = (detailDashboardStatistik || []).filter((item: any) => {
      const categoryCondition = selectedCategory ? item?.["@type"] === selectedCategory : true;
      const searchTermCondition = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryCondition && searchTermCondition;
    });
  
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const maxButtons = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(startPage + maxButtons - 1, Math.ceil(filteredStatistik.length / itemsPerPage));
  
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStatistik = filteredStatistik.slice(indexOfFirstItem, indexOfLastItem);
    
  
    // const googleSheetsUrl = `https://docs.google.com/spreadsheets/d/${statistik.resources[0].url}`;
  
    // const handleButtonClick = () => {
    //   window.open(googleSheetsUrl, '_blank');
    // };
  return (
    <>
    <section className="lg:py-24 lg:px-20 pb-5 bg-teal-50 dark:bg-jacarta-800">
        <article>
            <div className="relative overflow-hidden rounded-2.5xl mb-4 bg-white dark:bg-jacarta-700">
            <figure className="relative">
                <a href="/publikasi/dashboard-statistik"
                className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
                <img src="/img/blog/post_6.jpg" alt="item 20"
                    className="w-full lg:h-96 object-cover brightness-50 blur-lg transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                    height="290" width="959" />
                </a>
            </figure>
            <div className="pointer-events-none absolute bottom-0 w-1/2 p-5">
                <h1
                className="mb-4 text-center font-display text-3xl text-white dark:text-white md:text-left lg:text-3xl xl:text-4xl"
                >
                {currentStatistik && currentStatistik.length > 0 && (
                <h1>{currentStatistik[0].name}</h1>
                )}
                </h1>
                <p className="text-center text-md text-white dark:text-jacarta-200 md:text-left">
                Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini. Open Data Kota Depok menyediakan akses ke beragam koleksi dataset dari seluruh Organisasi Perangkat Daerah di Kota Depok.</p>
                <div className="mt-4 w-80 flex items-center justify-between">
                <a href="#" className="flex text-white dark:text-jacarta-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1 text-accent dark:text-jacarta-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span
                    className="text-md text-accent dark:text-jacarta-800">
                        Data Statistik
                    </span>
                </a>
                <div
                    className="flex items-center whitespace-nowrap rounded-md py-1 px-2 dark:border-jacarta-600">
                        <a href="#" className="flex text-white dark:text-jacarta-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1 text-accent dark:text-jacarta-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span
                        className="text-md text-accent dark:text-jacarta-800">
                        Data Tabel
                    </span>
                    </a>
                </div>
                </div>
                <p className="text-center text-md text-white dark:text-jacarta-200 md:text-left">
                Apa saja yang bisa dilakukan dengan Dataset? Temukan banyak hal tentang Kota Depok melalui berbagai koleksi data sesuai kebutuhan di sini.</p>
            </div>
            </div>
        </article>
        
        <div>
            <div className="flex mb-4">
            <div className="w-3/4 mr-2">
                {/* <div className="sm:col-span-3">
                <div className="mt-2">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)} // Update kategori saat terjadi perubahan pada select
                    className="block w-full border border-jacarta-100 rounded-md py-1.5 p-1.5 text-gray-900 sm:max-w-xs sm:text-sm sm:leading-6 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-jacarta-300 dark:placeholder-white"
                    >
                    <option value="">Semua Kategori</option>
                    {categories.map((category: any) => (
                        <option key={category.Id} value={category.Id}>
                        {category.Category}
                        </option>
                    ))}
                    </select>
                </div>
                </div> */}
            </div>
            <div className="w-1/4">
                <form onSubmit={(e) => e.preventDefault()} className="relative ml-12 mr-8 basis-3/12">
                <input type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                        placeholder="Search" />
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

        <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-2">
        {currentStatistik && currentStatistik.map((item: any, index: number) => (
            <div
            className="relative flex items-center rounded-2.5xl border border-jacarta-100 bg-white p-8 dark:border-jacarta-700 dark:bg-jacarta-700"
            key={index}
            
            >
            <figure className="mr-5 self-start" key={index}>
                <img src="/img/avatars/sekolah2.png" alt="avatar 2" className="rounded-lg w-16" loading="lazy" />
            </figure>

            <div>
                <h3 className="mb-1 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                {item.name}
                </h3>
                {/* <span className="mb-3 flex text-sm text-jacarta-500 dark:text-jacarta-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                </span> */}
                <span className="mb-3 flex text-sm text-jacarta-500 dark:text-jacarta-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {item.metadata_modified.slice(0, 10)}</span>
            </div>

            <div className="ml-auto rounded-full border border-jacarta-100 p-3 dark:border-jacarta-600 hover:bg-jacarta-100 dark:hover:bg-jacarta-600">
            <div className="flex items-center justify-between">

                <div className="dropdown rounded-full">
                <a
                    href="#"
                    className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center text-sm"
                    role="button"
                    id="itemActions1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <svg
                    width="16"
                    height="4"
                    viewBox="0 0 16 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-jacarta-500 dark:fill-jacarta-200"
                    >
                    <circle cx="2" cy="2" r="2" />
                    <circle cx="8" cy="2" r="2" />
                    <circle cx="14" cy="2" r="2" />
                    </svg>
                </a>
                <div
                    className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                    aria-labelledby="itemActions1"
                >
                    <a href={item.url} target="_blank">
                    <button
                        className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                        Unduh
                    </button>
                    </a>
                    {/* <a href={`https://docs.google.com/spreadsheets/d/${currentStatistik.url}`} target="_blank">
                    <button
                        className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                        onClick={handleButtonClick}
                    >
                        Pratinjau
                    </button>
                    </a> */}
                </div>
                </div>
            </div>
            </div>
            </div>
            )
            )}
            
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 my-5 bg-white px-4 py-3 sm:px-6 dark:border-jacarta-700 dark:bg-jacarta-700">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700 dark:text-white">
                Showing
                <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
                to
                <span className="font-medium mx-1">
                    {indexOfLastItem > filteredStatistik.length ? filteredStatistik.length : indexOfLastItem}
                </span>
                of
                <span className="font-medium mx-1">{filteredStatistik.length}</span>
                results
                </p>
            </div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
                onClick={() => paginate(currentPage - 1)} // Fungsi untuk halaman sebelumnya
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? 'hidden' : ''
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
                    className={`relative dark:text-white inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                    {pageNumber}
                </button>
                );
            })}
            <button
                onClick={() => paginate(currentPage + 1)} // Fungsi untuk halaman selanjutnya
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                indexOfLastItem >= filteredStatistik.length ? 'hidden' : ''
                }`}
            >
                <span className="sr-only">Next</span>
                Next
            </button>
            </nav>
            </div>
        </div>
    </section>
    </>
  )
}

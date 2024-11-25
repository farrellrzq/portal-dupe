'use client'
import { AgendaProps } from "@/controllers/types/publikasi-controller.type";
import { useState } from "react";

export default function Content({ DashboardStatistik }: { DashboardStatistik: AgendaProps[] | null }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredStatistik = (DashboardStatistik || []).filter((item: any) => {
    const categoryCondition = selectedCategory ? item?.["@type"] === selectedCategory : true;
    const searchTermCondition = item?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryCondition && searchTermCondition;
  });

  const totalPages = Math.ceil(filteredStatistik.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatistik = filteredStatistik.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Buttons (Limit to 3 buttons)
  const maxButtons = 3;
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }  

  return (
    <section className="lg:py-24 lg:px-20 pb-5 bg-teal-50 dark:bg-jacarta-800">
      <article>
            <div className="relative overflow-hidden rounded-2.5xl mb-4 bg-white dark:bg-jacarta-700">
            <figure className="relative">
                <a href="#"
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
                Dataset
                </h1>
                <p className="text-center text-md text-white dark:text-jacarta-200 md:text-left">
                Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini. Open Data Kota Depok menyediakan akses ke beragam koleksi dataset dari seluruh Organisasi Perangkat Daerah di Kota Depok.</p>
                <div className="mt-4 w-80 flex items-center justify-between">
                <a href="#" className="flex text-white dark:text-jacarta-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-1 text-accent dark:text-jacarta-800">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span
                    className="text-md text-accent dark:text-jacarta-800">
                        Data Statistik
                    </span>
                </a>
                <div
                    className="flex items-center whitespace-nowrap rounded-md py-1 px-2 dark:border-jacarta-600">
                        <a href="#" className="flex text-white dark:text-jacarta-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-1 text-accent dark:text-jacarta-800">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

      <div className="flex mb-4">
        <div className="w-3/4">
          {/* <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded-md py-2 px-3 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
          </select> */}
        </div>
        <div className="w-1/4 ml-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full border border-jacarta-100 rounded-md py-2 px-3 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {currentStatistik.map((item: any, index: number) => (
          <div
            // href={`/publikasi/dashboard-statistik/${item?.identifier}`}
            key={index}
            className="block flex border border-jacarta-100 p-8 rounded-lg bg-white dark:bg-gray-700 dark:border-jacarta-700 dark:bg-jacarta-700"
          >
            <figure className="mb-3 w-1/4 content-center">
              <img src="/img/avatars/pendidikan.png" alt={item?.title || 'Dataset'} className="w-16 h-16 rounded-lg" />
            </figure>
            <div className="w-3/4">
            <h3 className="font-bold text-base mb-2">{item?.title.toLowerCase() || 'No Title Available'}</h3>
            <p className="text-sm text-gray-600">{item?.publisher?.name || 'Unknown Organization'}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-300'} rounded-md`}
        >
            Prev
        </button>
        {pageNumbers.map((page) => (
            <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-4 py-2 mx-1 ${
                page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
            } rounded-md`}
            >
            {page}
            </button>
        ))}
        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-300'} rounded-md`}
        >
            Next
        </button>
        </div>
    </section>
  );
}


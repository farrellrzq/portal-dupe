"use client"
import Search from '@/components/dashboard/source/search';
import React, { useState } from 'react'
import { CmsContentProps } from '@/controllers/types/controller.type';
import { formatDate } from '@/helpers/site';
import { BeritaProps } from '@/controllers/types/home-controller.type';

export default function Content({ berita }: { berita: BeritaProps[] | null }) {
  // return JSON.stringify ( berita )
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Misalnya, 10 item per halaman

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
  };

  const filteredItem = berita ? berita.filter((item: any) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];


  // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
  const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(startPage + maxButtons - 1, Math.ceil(filteredItem.length / itemsPerPage));

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBerita = filteredItem.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <div className="flex mb-4">
          <div className="w-1/2 lg:w-3/4">
            <h3 className="font-display px-4 text-3xl text-jacarta-700 dark:text-white">List Berita</h3>
            <span className="text-md px-4 pb-2">Berita</span>
          </div>
          <div className="w-1/2 lg:w-1/4">
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


      <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
        {currentBerita.map((item: any, index: number) => (
          <article key={index}>
            <div className="overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg">
              <figure className="group overflow-hidden">
                {/* <a href={`/Publikasi/detail-berita/${item.slug_title}`}> */}
                <a href="#">
                  <img src={`https://cms.depok.go.id/upload/${item.lampiran}`} alt="post 2"
                    className="w-full object-cover transition-transform duration-[1600ms] h-60 will-change-transform group-hover:scale-105" />
                </a>
              </figure>

              <div
                className="rounded-b-[1.25rem] border border-t-0 border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700">
                <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                  <a href={item.link} target="_blank"
                    className="font-display text-jacarta-700 hover:text-green-600 dark:text-jacarta-200">Sumber</a>
                  <span className="dark:text-jacarta-400">in</span>
                  <span className="inline-flex flex-wrap items-center space-x-1 text-green-600">
                    <a href={item.link} target="_blank">{item.SiteName}</a>
                  </span>
                </div>
                <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400 mb-2">
                  <span>{formatDate(item.created_at)}</span>
                </div>
                <h2
                  className="mb-4 mt-2 font-display text-xl text-jacarta-700 hover:text-green-600 dark:text-white dark:hover:text-green-600">
                  <a href={`/publikasi/berita/${item?.slug_title}`}> {item.title.slice(0, 38)} </a>
                </h2>
                <p className="mb-8 text-sm dark:text-jacarta-200 line-clamp-2">
                  {item.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '').slice(0, 100)}
                </p>
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
                {indexOfLastItem > (filteredItem?.length ?? 0) ? (filteredItem?.length ?? 0) : indexOfLastItem}
              </span>
              of
              <span className="font-medium mx-1">{filteredItem?.length ?? 0}</span>
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
              onClick={() => paginate(Math.min(endPage + 1, Math.ceil((filteredItem?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${indexOfLastItem >= (filteredItem?.length ?? 0) ? 'hidden' : ''
                }`}
            >
              <span className="sr-only">Next</span>
              Next
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}

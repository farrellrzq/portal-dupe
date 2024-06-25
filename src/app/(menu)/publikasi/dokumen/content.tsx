"use client"
import Search from '@/components/dashboard/source/search';
import { CategoryProps, CmsContentProps } from '@/controllers/types/controller.type';
import { formatDate } from '@/helpers/site';
import Link from 'next/link';
import React, { useState } from 'react'

export default function Content({ dokumenProduk }: { dokumenProduk: CmsContentProps[] | null }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Misalnya, 10 item per halaman

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
  };

  // Filter dokumen berdasarkan nilai pencarian
  const filteredDokumen = dokumenProduk && dokumenProduk.filter((item: any) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
  const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(startPage + maxButtons - 1, Math.ceil((filteredDokumen?.length ?? 0) / itemsPerPage));

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDokumen = (filteredDokumen || []).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const API_CMS = process.env.NEXT_PUBLIC_API_CMS;
  return (
    <>
      <div className="flex mb-4">
        <div className="ml-auto w-4/12 lg:w-1/4">
          <form action="search" className="relative basis-3/12">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              placeholder="Search"
            />
            <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                />
              </svg>
            </span>
          </form>
        </div>
      </div>

      <div className="mb-10 shrink-0 basis-8/12 p-2.5 space-y-5 lg:mb-0">
        {currentDokumen && currentDokumen.map(item => (
          <div key={item.content_id}
            className="relative flex items-center rounded-2.5xl border border-jacarta-100 bg-white p-7 transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700"
          >
            <div>
              <h3 className="mb-2 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <button className="font-display text-sm font-semibold text-green-600">
                  {formatDate(item.tgl_publish)}
                </button>
              </div>
            </div>


            <div className="ml-auto rounded-full border border-jacarta-100 p-3 dark:border-jacarta-600">
              <a href={`${API_CMS}/upload/file/${item.uploaddokumen}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-black">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
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
                {indexOfLastItem > (filteredDokumen?.length ?? 0) ? (filteredDokumen?.length ?? 0) : indexOfLastItem}
              </span>
              of
              <span className="font-medium mx-1">{filteredDokumen?.length ?? 0}</span>
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
              onClick={() => paginate(Math.min(endPage + 1, Math.ceil((filteredDokumen?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${indexOfLastItem >= (filteredDokumen?.length ?? 0) ? 'hidden' : ''
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

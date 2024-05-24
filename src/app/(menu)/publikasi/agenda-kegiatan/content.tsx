"use client"
import Search from '@/components/dashboard/source/search';
import { AgendaProps } from '@/controllers/types/publikasi-controller.type';
import { formatTanggal } from '@/helpers/site';
import React, { useState } from 'react'

export default function Content({ agenda }: { agenda: AgendaProps[] | null }) {

  // return JSON.stringify ( agenda )
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Misalnya, 10 item per halaman

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
  };

  // Filter dokumen berdasarkan nilai pencarian
  // Check if agenda is truthy before filtering
  const filteredAgenda = agenda ? agenda.filter((item: any) => {
    return item.Title.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

// Rest of your code using filteredAgenda


  // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
  const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(startPage + maxButtons - 1, Math.ceil(filteredAgenda.length / itemsPerPage));

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgenda = filteredAgenda.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="my-6 font-display text-xl text-jacarta-700 dark:text-white">Agenda</h2>
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <div>
        <form action="search" className="relative w-44">
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

      <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-1 md:grid-cols-1">
        {currentAgenda && currentAgenda.map(item => (
          <div className="mb-8" key={item.Id}>
            <a
              data-bs-toggle="modal"
              data-bs-target={`.video-lightbox-${item.Id}`}
              target="_blank" className='cursor-pointer'>
              <div className="divide-jacarta-100 overflow-hidden rounded-lg border border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                <div className="border-jacarta-100 pb-4 text-lg font-medium text-jacarta-700 dark:border-jacarta-600 dark:text-white">
                  {item.Title}
                </div>
                <p className="dark:text-jacarta-300">{formatTanggal(item.TanggalAwal)}</p>
              </div>
            </a>
          </div>
        )
        )}
      </div>
    </>
  )
}

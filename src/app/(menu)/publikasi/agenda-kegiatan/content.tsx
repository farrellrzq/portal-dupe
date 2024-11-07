"use client"
import React, { useState } from 'react';
import { AgendaProps } from '@/controllers/types/publikasi-controller.type';
import { formatTanggal } from '@/helpers/site';

export default function Content({ agenda }: { agenda: AgendaProps[] | null }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(''); // State untuk tahun yang dipilih
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Kembali ke halaman pertama setiap kali pencarian berubah
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1); // Kembali ke halaman pertama setiap kali tahun berubah
  };

  // Filter dokumen berdasarkan nilai pencarian dan tahun yang dipilih
  const filteredAgenda = agenda
    ? agenda.filter((item: any) => {
        const matchesSearchTerm = item.Title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear ? new Date(item.TanggalAwal).getFullYear().toString() === selectedYear : true;
        return matchesSearchTerm && matchesYear;
      })
    : [];

  // Pagination logic
  const maxButtons = 3;
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
      <section className="relative bg-cover bg-center bg-no-repeat py-12">
        <div className="container relative z-10">
          <h2 className="mb-6 font-display text-3xl text-black dark:text-white">Agenda</h2>
          <p className="mb-12 max-w-xl text-lg text-jacarta-300">Agenda Diskominfo</p>

          {/* Tahun Filter */}
          <div className="flex">
            <ul className="nav nav-tabs w-1/3 space-y-9 self-start border-l-2 border-jacarta-200 py-2 pl-2 md:pl-8" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link nav-link--style-3 relative flex items-center whitespace-nowrap ${!selectedYear ? 'active' : ''} text-jacarta-300 hover:text-black`}
                  id="semua-tab"
                  type="button"
                  onClick={() => handleYearChange('')}
                  aria-selected={!selectedYear}
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl dark:text-white">Semua Tahun</span>
                </button>
              </li>
              {['2024', '2023', '2022', '2021', '2020'].map((year) => (
                <li className="nav-item" key={year} role="presentation">
                  <button
                    className={`nav-link nav-link--style-3 relative flex items-center whitespace-nowrap ${selectedYear === year ? 'active' : ''} text-jacarta-300 hover:text-black`}
                    id={`${year}-tab`}
                    type="button"
                    onClick={() => handleYearChange(year)}
                    aria-selected={selectedYear === year}
                  >
                    <span className="px-2 font-display text-lg font-medium md:text-2xl dark:text-white">{year}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Display Agenda */}
            <div className="tab-content w-full pl-4 md:px-16 md:w-2/4">
              <div className="tab-pane px-10 fade active show" id="semua" role="tabpanel">
                <div className="relative">
                  <div className="swiper card-slider-2-columns !pb-5">
                    <div className="swiper-wrapper">
                      {currentAgenda.length > 0 ? (
                        currentAgenda.map((item: any, index: number) => (
                          <div className="swiper-slide" key={index}>
                            <article>
                              <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                                <figure className="relative">
                                  <a href="#">
                                    <img
                                      src={item.Media ? `https://cms.depok.go.id/upload/event/${item.Media}` : "/img/kecamatan/dsw/kesehatan.png"}
                                      alt={item.Title}
                                      height="430"
                                      width="379"
                                      className="swiper-lazy h-[430px] w-full object-cover brightness-50"
                                    />
                                    <div className="swiper-lazy-preloader"></div>
                                  </a>
                                </figure>
                                <div className="p-6">
                                  <div className="flex items-center justify-between">
                                    <a href="#">
                                      <span className="font-display text-base text-jacarta-700 dark:text-white">{formatTanggal(item.TanggalAwal)}</span>
                                    </a>
                                    <span className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2">
                                      <span className="text-sm font-medium tracking-tight text-gray dark:text-white">Sudah Berlalu</span>
                                    </span>
                                  </div>
                                  <h2 className="mb-4 mt-2 font-display text-xl text-jacarta-700 dark:text-white">{item.Title}</h2>
                                  <p className="text-sm text-jacarta-200 dark:text-white">{item.Deskripsi.slice(0, 150) + '...'}</p>
                                </div>
                              </div>
                            </article>
                          </div>
                        ))
                      ) : (
                        <p>No agenda found for the selected filters.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

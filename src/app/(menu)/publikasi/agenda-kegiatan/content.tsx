"use client"
import Search from '@/components/dashboard/source/search';
import { AgendaProps } from '@/controllers/types/publikasi-controller.type';
import { formatDate, formatTanggal } from '@/helpers/site';
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
      {/* <h2 className="my-6 font-display text-xl text-jacarta-700 dark:text-white">Agenda</h2>
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
      </div> */}

      <section
        className="relative bg-cover bg-center bg-no-repeat py-12 after:absolute after:inset-0 after:bg-jacarta-900/60"
      // style={{ backgroundImage: "url('/img/ico-landing/ico_landing_roadmap.jpg')" }} // Perhatikan format objek di sini
      >
        <div className="container relative z-10">
          <h2 className="mb-6 font-display text-3xl text-black">Agenda</h2>
          <p className="mb-12 max-w-xl text-lg text-jacarta-300">
            Agenda Diskominfo
          </p>
          <div className="flex">
            <ul
              className="nav nav-tabs w-1/3 space-y-9 self-start border-l-2 border-jacarta-200 py-2 pl-2 md:pl-8"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-link--style-3 active relative flex items-center whitespace-nowrap text-jacarta-300 hover:text-black"
                  id="semua-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#semua"
                  type="button"
                  role="tab"
                  aria-controls="semua"
                  aria-selected="true"
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl text-black dark:text-white">Semua Tahun</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-link--style-3 relative flex items-center whitespace-nowrap text-jacarta-300 hover:text-black"
                  id="q4-2021-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#q4-2021"
                  type="button"
                  role="tab"
                  aria-controls="q4-2021"
                  aria-selected="false"
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl text-black dark:text-white">2024</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-link--style-3 relative flex items-center whitespace-nowrap text-jacarta-300 hover:text-black"
                  id="q1-2022-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#q1-2022"
                  type="button"
                  role="tab"
                  aria-controls="q1-2022"
                  aria-selected="false"
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl text-black dark:text-white">2023</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-link--style-3 relative flex items-center whitespace-nowrap text-jacarta-300 hover:text-black"
                  id="q2-2022-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#q2-2022"
                  type="button"
                  role="tab"
                  aria-controls="q2-2022"
                  aria-selected="false"
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl text-black dark:text-white">2022</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-link--style-3 relative flex items-center whitespace-nowrap text-jacarta-300 hover:text-black"
                  id="q3-2022-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#q3-2022"
                  type="button"
                  role="tab"
                  aria-controls="q3-2022"
                  aria-selected="false"
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl text-black dark:text-white">2021</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-link--style-3 relative flex items-center whitespace-nowrap text-jacarta-300 hover:text-black"
                  id="q4-2022-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#q4-2022"
                  type="button"
                  role="tab"
                  aria-controls="q4-2022"
                  aria-selected="false"
                >
                  <span className="px-2 font-display text-lg font-medium md:text-2xl text-black dark:text-white">2020</span>
                </button>
              </li>
            </ul>
            <div className="tab-content w-full pl-4 md:px-16 md:w-2/4">
              <div className="tab-pane px-10 fade active show" id="semua" role="tabpanel" aria-labelledby="semua-tab">
                <div className="relative">
                  <div className="swiper card-slider-2-columns !pb-5">
                    <div className="swiper-wrapper">
                      {agenda &&
                        agenda.map((item: any, index: number) => {
                          return (
                            <div className="swiper-slide" key={index}>
                              <article>
                                <div
                                  className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700"
                                >
                                  <figure className="relative">
                                    <a href="item.html">
                                      <img
                                        src={
                                          item.Media
                                            ? `https://cms.depok.go.id/upload/event/${item.Media}`
                                            : "/img/kecamatan/dsw/kesehatan.png"
                                        }
                                        alt="item 1"
                                        height="430"
                                        width="379"
                                        className="swiper-lazy h-[430px] w-full object-cover brightness-50"
                                      />
                                      <div className="swiper-lazy-preloader"></div>
                                    </a>
                                  </figure>
                                  <div className="pointer-events-none absolute bottom-16 w-full p-5">
                                    <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                                      <a
                                        href={item.link ? item.link : ""}
                                        target="_blank"
                                        className="font-display text-white hover:text-green-600 dark:text-white"
                                      >
                                        Sumber
                                      </a>
                                      <span className="text-white">
                                        in
                                      </span>
                                      <span className="inline-flex flex-wrap items-center space-x-1 text-green-600">
                                        <a href={item.link ? item.link : ""} target="_blank">
                                          {item.PIC ? item.PIC : ""}
                                        </a>
                                      </span>
                                    </div>
                                    <h2 className="mb-4 mt-2 font-display text-xl text-white hover:text-green-600 dark:text-white dark:hover:text-green-600">
                                      <a
                                        href={`/publikasi/berita/${item.slug_title}`}
                                      >
                                        {item.Title.slice(0, 38)}{" ..."}
                                      </a>
                                    </h2>
                                  </div>
                                  <div className="p-6">
                                    <div className="flex items-center justify-between">
                                      <a href="item.html">
                                        <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white"
                                        >{formatTanggal(item.TanggalAwal)}</span>
                                      </a>
                                      <span
                                        className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600"
                                      >
                                        <span className="text-sm font-medium tracking-tight text-gray">Sudah Berlalu</span>
                                      </span>
                                    </div>
                                    <a href="#" className="text-2xs text-jacarta-200">
                                      {item.Deskripsi
                                        .replace(
                                          /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                                          ""
                                        )
                                        .slice(0, 150) + "..."}
                                    </a>
                                  </div>
                                </div>
                              </article>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div
                    className="swiper-button-prev swiper-button-prev-3 group absolute top-1/2 -left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-left-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 group-hover:fill-accent"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
                    </svg>
                  </div>
                  <div
                    className="swiper-button-next swiper-button-next-3 group absolute top-1/2 -right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-right-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 group-hover:fill-accent"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="q4-2021" role="tabpanel" aria-labelledby="q4-2021-tab">

              </div>
              <div className="tab-pane fade" id="q1-2022" role="tabpanel" aria-labelledby="q1-2022-tab">
                {agenda &&
                  agenda.slice(0, 1).map((item: any, index: number) => {
                    return (
                      <div className="swiper-slide" key={index}>
                        <article>
                          <div
                            className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700"
                          >
                            <figure className="relative">
                              <a href="item.html">
                                <img
                                  src={
                                    item.Media
                                      ? `https://cms.depok.go.id/upload/event/${item.Media}`
                                      : "/img/kecamatan/dsw/kesehatan.png"
                                  }
                                  alt="item 1"
                                  height="430"
                                  width="379"
                                  className="swiper-lazy h-[430px] w-full object-cover brightness-50"
                                />
                                <div className="swiper-lazy-preloader"></div>
                              </a>
                            </figure>
                            <div className="pointer-events-none absolute bottom-16 w-full p-5">
                              <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                                <a
                                  href={item.link ? item.link : ""}
                                  target="_blank"
                                  className="font-display text-white hover:text-green-600 dark:text-white"
                                >
                                  Sumber
                                </a>
                                <span className="text-white">
                                  in
                                </span>
                                <span className="inline-flex flex-wrap items-center space-x-1 text-green-600">
                                  <a href={item.link ? item.link : ""} target="_blank">
                                    {item.PIC ? item.PIC : ""}
                                  </a>
                                </span>
                              </div>
                              <h2 className="mb-4 mt-2 font-display text-xl text-white hover:text-green-600 dark:text-white dark:hover:text-green-600">
                                <a
                                  href={`/publikasi/berita/${item.slug_title}`}
                                >
                                  {item.Title.slice(0, 38)}{" ..."}
                                </a>
                              </h2>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center justify-between">
                                <a href="item.html">
                                  <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white"
                                  >{formatTanggal(item.TanggalAwal)}</span>
                                </a>
                                <span
                                  className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600"
                                >
                                  <span className="text-sm font-medium tracking-tight text-gray">Sudah Berlalu</span>
                                </span>
                              </div>
                              <a href="#" className="text-2xs text-jacarta-200">
                                {item.Deskripsi
                                  .replace(
                                    /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                                    ""
                                  )
                                  .slice(0, 150) + "..."}
                              </a>
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
              </div>
              <div className="tab-pane fade" id="q2-2022" role="tabpanel" aria-labelledby="q2-2022-tab">
                {agenda &&
                  agenda.slice(1, 2).map((item: any, index: number) => {
                    return (
                      <div className="swiper-slide" key={index}>
                        <article>
                          <div
                            className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700"
                          >
                            <figure className="relative">
                              <a href="item.html">
                                <img
                                  src={
                                    item.Media
                                      ? `https://cms.depok.go.id/upload/event/${item.Media}`
                                      : "/img/kecamatan/dsw/kesehatan.png"
                                  }
                                  alt="item 1"
                                  height="430"
                                  width="379"
                                  className="swiper-lazy h-[430px] w-full object-cover brightness-50"
                                />
                                <div className="swiper-lazy-preloader"></div>
                              </a>
                            </figure>
                            <div className="pointer-events-none absolute bottom-16 w-full p-5">
                              <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                                <a
                                  href={item.link ? item.link : ""}
                                  target="_blank"
                                  className="font-display text-white hover:text-green-600 dark:text-white"
                                >
                                  Sumber
                                </a>
                                <span className="text-white">
                                  in
                                </span>
                                <span className="inline-flex flex-wrap items-center space-x-1 text-green-600">
                                  <a href={item.link ? item.link : ""} target="_blank">
                                    {item.PIC ? item.PIC : ""}
                                  </a>
                                </span>
                              </div>
                              <h2 className="mb-4 mt-2 font-display text-xl text-white hover:text-green-600 dark:text-white dark:hover:text-green-600">
                                <a
                                  href={`/publikasi/berita/${item.slug_title}`}
                                >
                                  {item.Title.slice(0, 38)}{" ..."}
                                </a>
                              </h2>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center justify-between">
                                <a href="item.html">
                                  <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white"
                                  >{formatTanggal(item.TanggalAwal)}</span>
                                </a>
                                <span
                                  className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600"
                                >
                                  <span className="text-sm font-medium tracking-tight text-gray">Sudah Berlalu</span>
                                </span>
                              </div>
                              <a href="#" className="text-2xs text-jacarta-200">
                                {item.Deskripsi
                                  .replace(
                                    /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                                    ""
                                  )
                                  .slice(0, 150) + "..."}
                              </a>
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
              </div>
              <div className="tab-pane fade" id="q3-2022" role="tabpanel" aria-labelledby="q3-2022-tab">

              </div>
              <div className="tab-pane fade" id="q4-2022" role="tabpanel" aria-labelledby="q4-2022-tab">

              </div>
              <div className="tab-pane fade" id="q1-2023" role="tabpanel" aria-labelledby="q1-2023-tab">

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

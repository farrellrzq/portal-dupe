'use client'
import { AgendaProps, InfografisProps } from '@/controllers/types/publikasi-controller.type';
import { VideoProps } from '@/controllers/types/publikasi-controller.type';
import React, { useState } from 'react'

export default function Content({ infografis, video }: { infografis: AgendaProps[] | null, video: AgendaProps[] | null }) {
    // return JSON.stringify ( video[0].id.videoId )
    const [videoUrl, setVideoUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
  
    const displayIframe = (videoId: string) => {
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
      setVideoUrl(youtubeEmbedUrl);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setVideoUrl('');
      setShowModal(false);
    };
  
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Misalnya, 10 item per halaman
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
    };
  
    // Filter dokumen berdasarkan nilai pencarian
    const filteredGaleri = infografis && infografis.filter((item: any) => {
      return item.Title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    const filteredVideo = video && video.filter((item: any) => {
      return item.snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
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
  
    // pagination video
  
    let startPageVideo = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPageVideo = Math.min(startPageVideo + maxButtons - 1, Math.ceil((filteredVideo?.length ?? 0) / itemsPerPage));
  
    const indexOfLastItemVideo = currentPage * itemsPerPage;
    const indexOfFirstItemVideo = indexOfLastItemVideo - itemsPerPage;
    const currentVideo = (filteredVideo || []).slice(indexOfFirstItemVideo, indexOfLastItemVideo);
  
    if (endPageVideo - startPageVideo + 1 < maxButtons) {
      startPageVideo = Math.max(1, endPageVideo - maxButtons + 1);
    }
  
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  return (
    <div className="container">
          <div className="scrollbar-custom overflow-x-auto rounded-lg">
              <div className="min-w-fit">
                <div className="flex">
                  {/* Tabs Nav */}
                <ul className="nav nav-tabs flex items-center my-6" role="tablist">
                  {/* Offers */}
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active mr-2.5 mb-2.5 rounded-t-xl bg-white border relative flex items-center whitespace-nowrap px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent"
                      id="offers-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#offers"
                      type="button"
                      role="tab"
                      aria-controls="offers"
                      aria-selected="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-1 h-5 w-5 fill-current"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M8 4h13v2H8V4zm-5-.5h3v3H3v-3zm0 7h3v3H3v-3zm0 7h3v3H3v-3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
                        />
                      </svg>
                      <span className="font-display text-base font-medium">Galeri</span>
                    </button>
                  </li>

                  {/* Properties */}
                  <li 
                     className="nav-item" role="presentation">
                    <button
                      className="nav-link mr-2.5 mb-2.5 rounded-t-xl border bg-white relative flex items-center whitespace-nowrap px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent"
                      id="properties-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#properties"
                      type="button"
                      role="tab"
                      aria-controls="properties"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-1 h-5 w-5 fill-current"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17z"
                        />
                      </svg>
                      <span className="font-display text-base font-medium">Video</span>
                    </button>
                  </li>
                </ul>
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
                
    
                {/* Tab Content */}
                <div className="tab-content">
                  {/* Offers */}
                  <div className="tab-pane fade show active" id="offers" role="tabpanel" aria-labelledby="offers-tab">
                    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                        {currentGaleri.map((item: any, index: number) => (
                          <article key={index}>
                            <a href="#"
                                // onClick={() => displayIframe(item.URL)}
                                data-bs-toggle="modal"
                                data-bs-target={`.video-lightbox-${item.Id}-${item.MediaType}`}
                                target="_blank"
                                key={index}
                              >
                            <div
                              className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                              <figure
                                  className="relative overflow-hidden rounded-lg before:absolute before:inset-0 before:bg-jacarta-900/25"
                                >
                                <img src={`https://cms.depok.go.id/upload/gallery/${item.Media}`} className="h-44 w-60 object-cover" alt="" />
                              </figure>
                              <div className="mt-7 flex items-center justify-between">
                                  <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">{item.Title.slice(0, 54) + '..'}</span>
                              </div>
                              <div className="mt-2 text-sm">
                                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">{item.Description}</span>
                              </div>
                            </div>
                            </a>
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
                            onClick={() => paginate(Math.min(endPage + 1, Math.ceil((filteredGaleri?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                indexOfLastItem >= (filteredGaleri?.length ?? 0) ? 'hidden' : ''
                            }`}
                            >
                            <span className="sr-only">Next</span>
                            Next
                            </button>
                        </nav>
                        </div>
                    </div>

                  </div>

                  {/* Properties */}
                  <div className="tab-pane fade" id="properties" role="tabpanel" aria-labelledby="properties-tab">
                    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                        {currentVideo.map((item: any, index: number) => (
                          <article key={index}>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target={`.video-lightbox-${item.id.videoId}`}
                              target="_blank"
                              key={index}
                            >
                            <div
                              className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                              <figure
                              className="relative overflow-hidden rounded-lg before:absolute before:inset-0 before:bg-jacarta-900/25"
                            >
                              <span className="js-video-modal-trigger absolute top-1/2 left-1/2 flex h-16 w-16 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white transition-transform will-change-transform hover:scale-90">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="h-8 w-8 fill-white"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path
                                    d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"
                                  />
                                </svg>
                                </span>
                              <img src={item.snippet.thumbnails.default.url} className="h-44 w-full object-cover" alt="" />
                            </figure>
                              <div className="mt-7 flex items-center justify-between">                                    
                                <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">{item.snippet.title.slice(0, 54) + '..'}</span>
                              </div>
                              <div className="mt-2 text-sm">
                                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">{item.snippet.description}</span>
                              </div>
                            </div>
                            </a>
                          </article>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 my-5 bg-white px-4 py-3 sm:px-6 dark:border-jacarta-700 dark:bg-jacarta-700">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-white">
                            Showing
                            <span className="font-medium mx-1">{indexOfFirstItemVideo + 1}</span>
                            to
                            <span className="font-medium mx-1">
                                {indexOfLastItemVideo > (filteredVideo?.length ?? 0) ? (filteredVideo?.length ?? 0) : indexOfLastItemVideo}
                            </span>
                            of
                            <span className="font-medium mx-1">{filteredVideo?.length ?? 0}</span>
                            results
                            </p>
                        </div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))} // Fungsi untuk halaman sebelumnya
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                currentPage === 1 ? 'hidden' : ''
                            }`}
                            >
                            <span className="sr-only">Previous</span>
                            Prev
                            </button>
                            {Array.from({ length: endPageVideo - startPageVideo + 1 }, (_, index) => {
                            const pageNumber = startPageVideo + index;
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
                            onClick={() => paginate(Math.min(endPageVideo + 1, Math.ceil((filteredVideo?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                indexOfLastItemVideo >= (filteredVideo?.length ?? 0) ? 'hidden' : ''
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
                {/* end tab content */}
              </div>
            </div>
            {infografis && infografis.map((item: any, index: number) => {
            return (
            <div
            key={index}
            className={`modal fade video-lightbox js-video-lightbox video-lightbox-${item.Id}-${item.MediaType}`} // Menggunakan kelas CSS
            tabIndex={-1}
            aria-label="Youtube Modal"
            aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                    <div className="modal-body">
                        <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="h-6 w-6 fill-jacarta-700"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                        </button>
                        <figure
                            className="relative overflow-hidden rounded-lg before:absolute before:inset-0 before:bg-jacarta-900/25"
                          >
                          <img src={`https://cms.depok.go.id/upload/gallery/${item.Media}`} className="w-full h-full object-cover" alt="" />
                        </figure>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )
            })}
            {video && video.map((item: any, index: number) => {
            return (
            <div
            key={index}
            className={`modal fade video-lightbox js-video-lightbox video-lightbox-${item.id.videoId}`} // Menggunakan kelas CSS
            tabIndex={-1}
            aria-label="Youtube Modal"
            aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                    <div className="modal-body">
                        <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="h-6 w-6 fill-jacarta-700"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                        </button>
                        <iframe
                          src={`https://www.youtube.com/embed/${item.id.videoId}`}
                          width="1000"
                          height="600"
                          title="Video Modal"
                        ></iframe>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )
            })}
          </div>
  )
}

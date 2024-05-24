'use client'
import { LayananKotaProps } from '@/controllers/types/home-controller.type';
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Content({ layananKota }: { layananKota: LayananKotaProps[] | null }) {
  // return JSON.stringify ( layananKota )

  const [videoUrl, setVideoUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const displayIframe = (url: string) => {
    setVideoUrl(url);
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
  const filteredLayanan = layananKota && layananKota.filter((item: any) => {
    return item.TitleMenu.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
  const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = filteredLayanan ? Math.min(startPage + maxButtons - 1, Math.ceil(filteredLayanan.length / itemsPerPage)) : 0;

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDokumen = filteredLayanan ? filteredLayanan.slice(indexOfFirstItem, indexOfLastItem) : null;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="container">
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
        <div
          className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10"
        >
          <div className="grid lg:gap-5 gap-2 grid-cols-2 md:grid-cols-4 mt-6">
            {currentDokumen && currentDokumen.map((item: any, index: number) => (
              <div key={index} className="rounded-2lg border border-jacarta-100 bg-white p-2 lg:p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700">
                {item.URLMenu === "" ? (
                  // <a href={`/Layanan/layanan-detail-kota/${item.Id}`}>
                  <a href="#">
                    <img
                      src={item.ImageMenu ? `https://cms.depok.go.id/upload/externalLogo/${item.ImageMenu || <Skeleton />}` : '/img/kecamatan/dsw/kesehatan.png'}
                      className="mx-auto mb-6 h-[5.125rem] w-[5.125rem]"
                      alt="team"
                    />
                    <h3 className="font-display text-md text-jacarta-700 dark:text-white">{item.TitleMenu || <Skeleton />}</h3>
                  </a>
                ) : (
                  <a
                    data-bs-toggle="modal"
                    data-bs-target={`.video-lightbox-${item.Id}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={item.ImageMenu ? `https://cms.depok.go.id/upload/externalLogo/${item.ImageMenu || <Skeleton />}` : '/img/kecamatan/dsw/kesehatan.png'}
                      className="mx-auto mb-6 h-[5.125rem] w-[5.125rem]"
                      alt="team"
                    />
                    <h3 className="font-display text-md text-jacarta-700 dark:text-white">{item.TitleMenu || <Skeleton />}</h3>
                  </a>
                )}
              </div>
            ))
            }
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 my-5 bg-white px-4 py-3 sm:px-6 dark:border-jacarta-700 dark:bg-jacarta-700">
          {filteredLayanan && (
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-white">
                  Showing
                  <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
                  to
                  <span className="font-medium mx-1">
                    {indexOfLastItem > filteredLayanan.length ? filteredLayanan.length : indexOfLastItem}
                  </span>
                  of
                  <span className="font-medium mx-1">{filteredLayanan.length}</span>
                  results
                </p>
              </div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
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
                  onClick={() => paginate(Math.min(endPage + 1, Math.ceil(filteredLayanan.length / itemsPerPage)))}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${indexOfLastItem >= filteredLayanan.length ? 'hidden' : ''
                    }`}
                >
                  <span className="sr-only">Next</span>
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      {layananKota && layananKota.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`modal fade video-lightbox js-video-lightbox video-lightbox-${item.Id}`} // Menggunakan kelas CSS
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
                      src={item.UR}
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
    </>
  )
}

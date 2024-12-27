"use client"
import Search from '@/components/dashboard/source/search';
import { CategoryProps, CmsContentProps } from '@/controllers/types/controller.type';
import { formatDate } from '@/helpers/site';
import Link from 'next/link';
import React, { useState } from 'react'

export default function Content({ pengumuman, categories }: { pengumuman: CmsContentProps[] | null, categories: CategoryProps[] | null  }) {
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
  const filteredPengumuman = pengumuman && pengumuman.filter((item: any) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Hitung dokumen yang harus ditampilkan sesuai halaman saat ini
  const maxButtons = 3; // Menentukan jumlah tombol yang ingin ditampilkan

  // pagination galeri

  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = filteredPengumuman ? Math.min(startPage + maxButtons - 1, Math.ceil(filteredPengumuman.length / itemsPerPage)) : 0;


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPengumuman = filteredPengumuman ? filteredPengumuman.slice(indexOfFirstItem, indexOfLastItem) : [];

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
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
            <div>
            <select
                id="category"
                name="category"
                className="block w-full rounded-md border border-jacarta-100 py-1.5 p-1.5 sm:max-w-xs sm:text-sm sm:leading-6 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] text-gray-900 text-jacarta-700 dark:text-jacarta-300 dark:placeholder-white"
              >
                <option value="">All Categories</option>
                {categories && categories.map(category => (
                  <option key={category.Id} value={category.Category}>{category.Category}</option>
                ))}
              </select>
            </div>
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
                {currentPengumuman.map((item: any, index: number) => (
                  <article key={index}>
                    <Link href={`/publikasi/pengumuman/${item?.slug_title}`}>
                      <div
                        className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                        <figure
                          className="relative overflow-hidden rounded-lg before:absolute before:inset-0 before:bg-jacarta-900/25"
                        >
                          <img src={item.lampiran ? `https://cms.depok.go.id/upload/${item.lampiran}` : '/img/kecamatan/dsw/kesehatan.png'} className="h-44 w-60 object-cover" alt="" />
                        </figure>
                        <div className="mt-7 flex items-center justify-between">
                          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">{item.title.slice(0, 54) + '..'}</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">{formatDate(item.tgl_publish)}</span><br />
                          <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">{item.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '').slice(0, 100)}</span>
                        </div>
                      </div>
                    </Link>
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
                        {indexOfLastItem > (filteredPengumuman?.length ?? 0) ? (filteredPengumuman?.length ?? 0) : indexOfLastItem}
                      </span>
                      of
                      <span className="font-medium mx-1">{filteredPengumuman?.length ?? 0}</span>
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
                      onClick={() => paginate(Math.min(endPage + 1, Math.ceil((filteredPengumuman?.length ?? 0) / itemsPerPage)))} // Fungsi untuk halaman selanjutnya
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${indexOfLastItem >= (filteredPengumuman?.length ?? 0) ? 'hidden' : ''
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
    </div>
  )
}
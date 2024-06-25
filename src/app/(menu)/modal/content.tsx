'use client'
import { BeritaProps } from '@/controllers/types/home-controller.type';
import { formatDate } from '@/helpers/site';
import React, { useState } from 'react'

export default function Content({ berita }: { berita: BeritaProps[] | null }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
    const filteredBerita = berita?.filter((item: any) => {
      const searchTermCondition = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return searchTermCondition;
    });
  
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const maxButtons = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(
      startPage + maxButtons - 1,
      Math.ceil((filteredBerita?.length || 0) / itemsPerPage)
    );
  
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    // Ensure filteredBerita is defined before calling slice
    const currentBerita =
      filteredBerita?.slice(indexOfFirstItem, indexOfLastItem) || [];
  return (
    <>
      <div className="modal-dialog smg:max-w-lg lg:max-w-7xl">
        <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="walletModalLabel">
                Cari Berita
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-6 w-6 fill-jacarta-700 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6 text-center">
              {/* <!-- Search --> */}
              <div className="w-1/4">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative ml-12 mr-8 basis-3/12"
                >
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                      <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                    </svg>
                  </span>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-1 md:grid-cols-4 mt-10">
                {currentBerita.slice(0, 4).map((item: any, index: number) => (
                  <article key={index}>
                    <div className="overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg">
                      <figure className="group overflow-hidden">
                        <a
                          href={`/Publikasi/detail-berita/${item.slug_title}`}
                        >
                          <img
                            src={
                              item.lampiran
                                ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                : "/img/kecamatan/dsw/kesehatan.png"
                            }
                            alt="post 2"
                            className="w-full object-cover transition-transform duration-[1600ms] h-60 will-change-transform group-hover:scale-105"
                          />
                        </a>
                      </figure>

                      <div className="rounded-b-[1.25rem] border border-t-0 border-jacarta-100 bg-white p-[8%] dark:border-jacarta-600 dark:bg-jacarta-700">
                        <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                          <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                            {formatDate(item.created_at)}
                          </span>
                        </div>

                        <h2 className="mb-4 font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent">
                          <a
                            href={`/Publikasi/detail-berita/${item.slug_title}`}
                          >
                            {" "}
                            {item.title.slice(0, 48)}{" "}
                          </a>
                        </h2>
                        <p className="mb-8 text-sm dark:text-jacarta-200">
                          {item.content
                            .replace(
                              /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                              ""
                            )
                            .slice(0, 90) + "..."}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

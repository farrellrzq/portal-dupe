'use client'
import React, { useState } from 'react'
import useModalState from '@/components/dashboard/useModalState';
import { formatDate } from '@/helpers/site';
import Modal from 'react-modal'
import { PengumumanProps } from '@/controllers/types/home-controller.type';

export default function Content({ pengumuman }: { pengumuman: PengumumanProps[] | null }) {
  const { videoUrl, showModal, displayIframe, closeModal } = useModalState();
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };
  return (
    <>
      {pengumuman &&
        pengumuman.length > 0 &&
        pengumuman.slice(0, 1).map((item: any, index: number) => (
          <Modal
            isOpen={isWelcomeModalOpen}
            onRequestClose={() => setIsWelcomeModalOpen(false)}
            contentLabel="Custom Modal"
            style={{
              overlay: {
                position: "fixed",
                zIndex: "50",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgb(0 0 0 / 60%)",
              },
              content: {
                position: "absolute",
                top: "40px",
                left: "40px",
                right: "40px",
                bottom: "40px",
                // border: "1px solid #ccc",
                // background: "rgb(0 0 0)",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "20px",
                zIndex: "50",
              },
            }}
            className="custom-modal z-50" key={index}
          >
            <div className="lg:mt-20 lg:mx-80 mt-24">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    type="button"
                    className="btn-close py-1 xl:py-3.5 sm:w-8 xl:w-[3.3rem] rounded-full self-center m-1 mt-6 bg-slate-900 webkit-center"
                    onClick={closeWelcomeModal}
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
                  <article key={index}>
                    <div className="block rounded-2.5xl border min-h-[22rem] border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                      <figure className="relative">
                        <a
                          href={`/publikasi/pengumuman/${item.slug_title}/${item.content_id}`}
                        >
                          <img
                            src={
                              item.lampiran
                                ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                : "/img/kecamatan/dsw/kesehatan.png"
                            }
                            alt="item 5"
                            className="w-full rounded-[0.625rem] max-h-52 object-cover"
                            loading="lazy"
                          />
                        </a>
                      </figure>
                      <div className="mt-7 text-[0.55rem] lg:text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          {formatDate(item.tgl_publish) ? formatDate(item.tgl_publish) : ""}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <a
                          href={`/publikasi/pengumuman/${item.slug_title}/${item.content_id}`}
                        >
                          <span className="font-display text-base lg:text-xl text-jacarta-700 hover:text-accent dark:text-white">
                            {item.title ? item.title : ""}
                          </span>
                        </a>
                      </div>
                      <div className="mt-2 text-sm lg:text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          {item.content
                            .replace(
                              /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                              ""
                            )
                            .slice(0, 200) + "..."}
                        </span>
                      </div>

                      <div className="flex mt-4">
                        <a
                          href={`/publikasi/pengumuman/${item.slug_title}/${item.content_id}`}
                          className="flex rounded-md bg-green-600 p-1.5 px-4 m-1 text-center items-center text-[0.55rem] lg:text-xs font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mr-1 hidden lg:block"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                          </svg>
                          Detail Pengumuman
                        </a>
                        <a
                          href="/publikasi/pengumuman"
                          target="_blank"
                          className="rounded-md bg-accent p-1.5 px-4 m-1 flex text-center items-center text-[0.55rem] lg:text-xs font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mr-1 hidden lg:block"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          Lihat Semua
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </Modal>
        ))}
    </>
  )
}

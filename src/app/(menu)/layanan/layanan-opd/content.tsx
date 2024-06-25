'use client'
import { LayananProps } from '@/controllers/types/home-controller.type'
import { formatDate } from '@/helpers/site';
import React, { useState } from 'react'

export default function Content({ layanan }: { layanan: LayananProps[] | null }) {
    //   return JSON.stringify ( layanan )

    const [videoUrl, setVideoUrl] = useState('');
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setVideoUrl('');
        setShowModal(false);
    };
    return (
        <div className="container">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-5">
                {layanan && layanan.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className="rounded-2lg border border-jacarta-100 bg-white p-2 lg:p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
                        >
                            {item.urlcontent === "" ? (
                                <a
                                    href=""
                                    data-bs-toggle="modal"
                                    data-bs-target={`.video-lightbox-${item.content_id}`}
                                >
                                    <img
                                        src={
                                            item.lampiran
                                                ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                                : "/img/kecamatan/dsw/kesehatan.png"
                                        }
                                        className="mx-auto mb-6 h-24 object-contain"
                                        alt="team"
                                    />
                                    <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                        {item.title ? item.title : ""}
                                    </h3>
                                </a>
                            ) : (
                                <a
                                    href={item.urlcontent}
                                    target="_blank"
                                >
                                    <img
                                        src={
                                            item.lampiran
                                                ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                                : "/img/kecamatan/dsw/kesehatan.png"
                                        }
                                        className="mx-auto mb-6 h-24 object-contain"
                                        alt="team"
                                    />
                                    <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                        {item.title ? item.title : ""}
                                    </h3>
                                </a>
                            )}
                        </div>
                    )
                })}
            </div>
            {layanan && layanan.map((item: any, index: number) => {
                return (
                    <div
                        key={index}
                        className={`modal fade video-lightbox js-video-lightbox video-lightbox-${item.content_id}`} // Menggunakan kelas CSS
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
                                        <div className="relative flex items-center rounded-2.5xl border border-jacarta-100 bg-white p-7 transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700" key={index}>
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
                                        </div>
                                        <iframe src={`https://cms.depok.go.id/upload/file/${item.uploaddokumen}`}
                                            width="1000"
                                            height="600"></iframe>
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

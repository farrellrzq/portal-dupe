'use client'
import { LayananKotaProps, LayananProps } from '@/controllers/types/home-controller.type';
import React, { useState } from 'react'

export default function Content({ layanan, layananKota }: { layanan: LayananProps[] | null, layananKota: LayananKotaProps[] | null }) {
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
    // return JSON.stringify ( layananKota )
    return (
        <div className="tab-content">
            {/* Offers */}
            <div
                className="tab-pane fade show active"
                id="offers"
                role="tabpanel"
                aria-labelledby="offers-tab"
            >
                <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
                        {layanan &&
                            layanan.slice(0, 4).map((item: any, index: number) => {
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
                                );
                            })}
                    </div>
                </div>
            </div>

            {/* Properties */}
            <div
                className="tab-pane fade"
                id="properties"
                role="tabpanel"
                aria-labelledby="properties-tab"
            >
                <div
                    className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10"
                >
                    {/* <div className="grid lg:gap-5 gap-2 grid-cols-2 md:grid-cols-4 mt-6">
                        {layananKota && layananKota.slice(0, 8).map((item: any, index: number) => (
                            <div key={index} className="rounded-2lg border border-jacarta-100 bg-white p-2 lg:p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700">
                                {item.URLMenu === "" ? (
                                    // <a href={`/Layanan/layanan-detail-kota/${item.Id}`}>
                                    <a href={`layanan/layanan-kota/${item?.Id}`}>
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
                    </div> */}
                </div>
            </div>
            {/* {layananKota && layananKota.map((item: any, index: number) => {
                const cleanedURL = item.URLMenu.trim(); // Menghapus spasi di sekitar URL
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
                                <div className="">
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
                                            src={cleanedURL}
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
            })} */}
        </div>
    )
}



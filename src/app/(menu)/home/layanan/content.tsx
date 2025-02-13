'use client'
import useModalState from '@/components/dashboard/useModalState';
import { LayananKotaProps, LayananProps } from '@/controllers/types/home-controller.type';
import React, { useState } from 'react'

export default function Content({ layanan, layananKota }: { layanan: LayananProps[] | null, layananKota: LayananKotaProps[] | null }) {
    // return JSON.stringify(layananKota);
    const { videoUrl, showModal, displayIframe, closeModal } = useModalState();
    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

    const closeWelcomeModal = () => {
        setIsWelcomeModalOpen(false);
    };
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
                <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                    <div className="grid lg:gap-5 gap-2 grid-cols-2 md:grid-cols-4 mt-6">
                        {layananKota &&
                            layananKota
                                .filter(
                                    (item: { ParentId: string }) =>
                                        item.ParentId === ""
                                )
                                .map(
                                    (
                                        item: {
                                            URLMenu: string;
                                            Id: any;
                                            ImageMenu: any;
                                            TitleMenu: string;
                                        },
                                        index: React.Key | null | undefined
                                    ) => (
                                        <div
                                            key={index}
                                            className="rounded-2lg border border-jacarta-100 bg-white p-2 lg:p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
                                        >
                                            {item.URLMenu === "" ? (
                                                <a
                                                    href={`/Layanan/layanan-detail-kota/${item.Id}`}
                                                >
                                                    <img
                                                        src={
                                                            item.ImageMenu
                                                                ? `https://cms.depok.go.id/upload/externalLogo/${item.ImageMenu}`
                                                                : "/img/kecamatan/dsw/kesehatan.png"
                                                        }
                                                        className="mx-auto mb-6 h-24 object-contain"
                                                        alt="team"
                                                    />
                                                    <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                                        {item.TitleMenu ? item.TitleMenu : ""}
                                                    </h3>
                                                </a>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        displayIframe(item.URLMenu)
                                                    }
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <img
                                                        src={
                                                            item.ImageMenu
                                                                ? `https://cms.depok.go.id/upload/externalLogo/${item.ImageMenu}`
                                                                : "/img/kecamatan/dsw/kesehatan.png"
                                                        }
                                                        className="mx-auto mb-6 h-24 object-contain"
                                                        alt="team"
                                                    />
                                                    <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                                        {item.TitleMenu ? item.TitleMenu : ""}
                                                    </h3>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                    </div>
                </div>
            </div>
        </div>
    )
}



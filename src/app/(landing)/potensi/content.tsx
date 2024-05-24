import { PotensiProps } from '@/controllers/types/home-controller.type';
import React from 'react'

export default function Content({ potensi }: { potensi: PotensiProps[] | null }) {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
            {potensi &&
                potensi.slice(0, 4).map((item: any, index: number) => {
                    return (
                        <article key={index}>
                            <div className="rounded-2.5xl hover:relative hover:bottom-6 border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                                <a
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target={`.video-lightbox-${item.Id}`}
                                    target="_blank"
                                >
                                    <img
                                        src={item.Image
                                            ? `https://cms.depok.go.id/upload/place/${item.Image}`
                                            : "/img/kecamatan/dsw/kesehatan.png"
                                        }
                                        alt="item 1"
                                        className="w-full h-32 object-cover rounded-[0.625rem]"
                                        loading="lazy"
                                    />
                                </a>

                                <a
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target={`.video-lightbox-${item.Id}`}
                                    target="_blank"
                                    className="mt-5 mb-2 flex items-center font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
                                >
                                    {item.Nama ? item.Nama : ""}
                                    <div
                                        className="flex h-[1.125rem] w-[1.125rem] ml-1 mb-px items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                                        data-tippy-content="Verified Collection"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            className="h-[.875rem] w-[.875rem] fill-white"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                        </svg>
                                    </div>
                                </a>
                                <div className="flex">
                                    {/* <a
                    href="/home"
                    className="flex rounded-md bg-green-600 p-1.5 px-4 m-1 text-center items-center text-xs font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>

                    Selengkapnya
                </a> */}
                                    <a
                                        href={`https://www.google.co.id/maps/?q=${item["Alamat"]}/${item["Lat"]},${item["Lng"]}`}
                                        target="_blank"
                                        className="rounded-md bg-accent p-1.5 px-4 m-1 flex text-center items-center text-xs font-semibold text-white shadow-green-600-volume transition-all hover:bg-green-600-dark"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-1"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>
                                        Maps
                                    </a>
                                </div>
                            </div>
                        </article>
                    );
                })}
        </div>
    )
}

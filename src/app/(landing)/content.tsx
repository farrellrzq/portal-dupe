import { LandingProps } from '@/controllers/types/landing-controller.type'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Content({ getKecamatan }: { getKecamatan: LandingProps[] | null }) {

    return (
        <>
            {getKecamatan && getKecamatan.map((item: any, index: number) => {
                return (
                    <div className="swiper-slide" key={index}>
                        <article>
                            <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                                <figure className="relative" key={index}>
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target={`.popup${item.Id || <Skeleton />}`}
                                        target="_blank"
                                    >
                                        <img
                                            src={item.Image
                                                ? `https://cms.depok.go.id/upload/place/${item.Image}`
                                                : "/img/kecamatan/dsw/kesehatan.png"
                                            }
                                            alt="item 1"
                                            className="swiper-lazy h-[260px] w-full object-cover"
                                            height="430"
                                            width="379"
                                        />
                                        <div className="swiper-lazy-preloader"></div>
                                    </a>
                                </figure>
                                <div className="p-6">
                                    <div className="flex">
                                        <div>
                                            <a href="#" className="block">
                                                <span className="font-display text-lg leading-none text-jacarta-700 hover:text-yellow-600 dark:text-white">
                                                    {item.Nama || <Skeleton />}
                                                </span>
                                            </a>
                                            <a href={`https://${item.Domain}`} target="_blank" className="text-2xs text-yellow-600">
                                                {item.Alamat ? item.Alamat : "Alamat Tidak Tercantum" || <Skeleton />}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                )
            })}
        </>
    )
}

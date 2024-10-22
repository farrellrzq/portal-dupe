import { PengumumanProps } from '@/controllers/types/home-controller.type';
import React from 'react'

export default function Content({ pengumuman }: { pengumuman: PengumumanProps[] | null }) {
    // return JSON.stringify ( pengumuman )
    return (
        <div className="swiper single-slider text-center mb-0">
            <div className="swiper-wrapper">
                {pengumuman &&
                    pengumuman.slice(0, 2).map((item: any, index: number) => {
                        return (
                            <div className="swiper-slide" key={index}>
                                <article>
                                    <div className="relative overflow-hidden rounded-2.5xl mb-4 bg-white dark:bg-jacarta-700">
                                        <figure className="relative">
                                            <a
                                                href="/publikasi/pengumuman"
                                                className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20"
                                            >
                                                <img
                                                    src={
                                                        item.lampiran
                                                            ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                                            : "/img/kecamatan/dsw/kesehatan.png"
                                                    }
                                                    alt="item 20"
                                                    className="w-full lg:h-96 object-cover brightness-50 transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                                                    height="290"
                                                    width="959"
                                                />
                                            </a>
                                        </figure>
                                        <div className="pointer-events-none absolute bottom-0 w-full p-5">
                                            <h1 className="mb-4 text-center font-display text-3xl text-white dark:text-white md:text-left lg:text-3xl xl:text-4xl">
                                                {item.title ? item.title : ""}
                                            </h1>
                                            <p className="text-center text-lg text-white dark:text-jacarta-200 md:text-left">
                                                {item.content
                                                    .replace(
                                                        /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                                                        ""
                                                    )
                                                    .slice(0, 100) ? item.content
                                                        .replace(
                                                            /<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g,
                                                            ""
                                                        )
                                                        .slice(0, 100) : ""}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

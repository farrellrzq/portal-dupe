import { AgendaProps } from '@/controllers/types/publikasi-controller.type';
import { formatTanggal } from '@/helpers/site';
import React from 'react'

export default function content({ agenda }: { agenda: AgendaProps[] | null }) {
    return (
        <>
            {agenda &&
                agenda.slice(0, 1).map((item: any, index: number) => {
                    return (
                        <article className="mx-8" key={index}>
                            <div className="relative overflow-hidden rounded-2.5xl mb-4 bg-white dark:bg-jacarta-700">
                                <figure className="relative">
                                    <a
                                        href="/publikasi/agenda-kegiatan"
                                        className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20"
                                    >
                                        {/* {item.Media ? `https://cms.depok.go.id/upload/gallery/${item.Media}` : '/img/kecamatan/dsw/kesehatan.png'} */}
                                        <img
                                            src={
                                                item.Media
                                                    ? `https://cms.depok.go.id/upload/event/${item.Media}`
                                                    : "/img/kecamatan/dsw/kesehatan.png"
                                            }
                                            alt="item 20"
                                            className="w-full lg:h-72 object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                                            height="290"
                                            width="959"
                                        />
                                    </a>
                                </figure>
                                <div className="pointer-events-none absolute bottom-0 w-full p-5">
                                    <h2 className="font-display text-2xl leading-none text-white">
                                        {item.Title ? item.Title : ""}
                                    </h2>
                                    <span className="text-2xs text-white">
                                        Upacara Kemerdekaan
                                    </span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 mx-8 md:gap-[1.875rem] lg:grid-cols-2">
                {agenda &&
                    agenda.slice(0, 2).map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex rounded-2.5xl border border-jacarta-100 bg-white py-4 px-4 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700"
                            >
                                <div className="flex-1 bg-white text-center dark:bg-jacarta-700">
                                    <a href="/publikasi/agenda-kegiatan">
                                        <span className="block font-display text-lg lg:text-xl text-[#8DD059]">
                                            {formatTanggal(item.TanggalAwal) ? formatTanggal(item.TanggalAwal) : ""}
                                        </span>
                                        <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                                            {item.Title ? item.Title : ""}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    )
}

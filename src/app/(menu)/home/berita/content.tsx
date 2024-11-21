import { BeritaKelurahanProps, BeritaKotaProps, BeritaProps } from '@/controllers/types/home-controller.type';
import { formatDate } from '@/helpers/site';
import React from 'react'

export default function Content({ beritaKota, berita, beritaKelurahan }: { beritaKota: BeritaKotaProps[] | null, berita: BeritaProps[] | null, beritaKelurahan: BeritaKelurahanProps[] | null }) {

    return (
        <div className="tab-content">
            {/* <!-- kota Tab --> */}
            <div
                className="tab-pane fade"
                id="kota"
                role="tabpanel"
                aria-labelledby="kota-tab"
            >
                <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
                    {/* <!-- Posts --> */}
                    {beritaKota &&
                        beritaKota.slice(0, 3).map((item: any, index: number) => {
                            return (
                                <article key={index}>
                                    <div className="overflow-hidden">
                                        <figure className="group overflow-hidden">
                                            <a href={item.link ? item.link : ""} target="_blank">
                                                <img
                                                    src={
                                                        item.image
                                                            ? item.image
                                                            : "/img/products/item_27_square.jpg"
                                                    }
                                                    alt="post 2"
                                                    className="h-80 w-full rounded-2xl object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                                                />
                                            </a>
                                        </figure>

                                        {/*  Body */}
                                        <div className="rounded-2xl relative m-5 bottom-24 border border-t-0 border-jacarta-100 bg-white px-[10%] py-[5%] dark:border-jacarta-600 dark:bg-jacarta-700">
                                            {/*  Meta */}
                                            <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                                                <a
                                                    href={item.link ? item.link : ""}
                                                    target="_blank"
                                                    className="font-display text-jacarta-700 hover:text-yellow-600 dark:text-jacarta-200"
                                                >
                                                    Sumber
                                                </a>
                                                <span className="dark:text-jacarta-400">
                                                    dari
                                                </span>
                                                <span className="inline-flex flex-wrap items-center space-x-1 text-yellow-600">
                                                    <a href={item.link ? item.link : ""} target="_blank">
                                                        Berita Kota
                                                    </a>
                                                </span>
                                            </div>
                                            <span className="text-sm text-jacarta-700 hover:text-yellow-600 dark:text-white">
                                                {formatDate(item.published_at) ? formatDate(item.published_at) : ""}
                                            </span>
                                            <h2 className="mb-4 mt-2 font-display text-xl text-jacarta-700 hover:text-yellow-600 dark:text-white dark:hover:text-yellow-600">
                                                <a href={item.link ? item.link : ""} target="_blank">
                                                    {item.title?.slice(0, 43) ?? " ..."}
                                                </a>
                                            </h2>
                                            <p className="text-sm dark:text-jacarta-200 line-clamp-2">
                                                {item.description?.slice(0, 150) ?? " ..."}
                                            </p>

                                            {/* <!-- Date / Time --> */}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                </div>
                {/* <!-- Load More --> */}
                <div className="mt-4 text-center">
                    <a
                        href="https://berita.depok.go.id/"
                        className="inline-block rounded-full bg-yellow-600 py-3 px-8 text-center font-semibold text-white shadow-yellow-600-volume transition-all hover:bg-yellow-600-dark"
                    >
                        Selengkapnya
                    </a>
                </div>
            </div>
            {/* <!-- end kota tab --> */}

            {/* <!-- On Sale Tab --> */}
            <div
                className="tab-pane fade show active"
                id="on-sale"
                role="tabpanel"
                aria-labelledby="on-sale-tab"
            >
                <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
                    {/* <!-- Posts --> */}
                    {berita &&
                        berita.slice(0, 3).map((item: any, index: number) => {
                            return (
                                <article key={index}>
                                    <div className="overflow-hidden">
                                        <figure className="group overflow-hidden">
                                            <a
                                                href={`/publikasi/detail-berita/${item.slug_title}/${item.content_id}`}
                                            >
                                                <img
                                                    src={
                                                        item.lampiran
                                                            ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                                            : "/img/kecamatan/dsw/kesehatan.png"
                                                    }
                                                    alt="post 2"
                                                    className="h-80 w-full rounded-2xl object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                                                />
                                            </a>
                                        </figure>

                                        <div className="rounded-2xl relative m-5 bottom-24 border border-t-0 border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700">
                                            <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                                                <a
                                                    href={item.link ? item.link : ""}
                                                    target="_blank"
                                                    className="font-display text-jacarta-700 hover:text-yellow-600 dark:text-jacarta-200"
                                                >
                                                    Sumber
                                                </a>
                                                <span className="dark:text-jacarta-400">
                                                    dari
                                                </span>
                                                <span className="inline-flex flex-wrap items-center space-x-1 text-yellow-600">
                                                    <a href={item.link ? item.link : ""} target="_blank">
                                                        {item.SiteName ? item.SiteName : ""}
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400 mb-2">
                                                <span>{formatDate(item.tgl_publish)}</span>
                                            </div>
                                            <h2 className="mb-4 mt-2 font-display text-xl text-jacarta-700 hover:text-yellow-600 dark:text-white dark:hover:text-yellow-600">
                                                <a
                                                    href={`/publikasi/berita/${item.slug_title}/${item.content_id}`}
                                                >
                                                    {item.title.slice(0, 38)}{" ..."}
                                                </a>
                                            </h2>
                                            <p className="text-sm dark:text-jacarta-200 line-clamp-2" style={{ textTransform: 'inherit' }} dangerouslySetInnerHTML={{ __html: item?.content }}>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                </div>
                {/* <!-- Load More --> */}
                <div className="mt-4 text-center">
                    <a
                        href="/publikasi/berita"
                        className="inline-block rounded-full bg-yellow-600 py-3 px-8 text-center font-semibold text-white shadow-yellow-600-volume transition-all hover:bg-yellow-600-dark"
                    >
                        Selengkapnya
                    </a>
                </div>
            </div>
            {/* <!-- end on sale tab --> */}

            {/* <!-- kota Tab --> */}
            <div
                className="tab-pane fade"
                id="kelurahan"
                role="tabpanel"
                aria-labelledby="kelurahan-tab"
            >
                <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
                    {/* <!-- Posts --> */}
                    {beritaKelurahan &&
                        beritaKelurahan
                            .slice(0, 3)
                            .map((item: any, index: number) => {
                                return (
                                    <article key={index}>
                                        <div className="overflow-hidden">
                                            <figure className="group overflow-hidden">
                                                <a href={item.link ? item.link : ""} target="_blank">
                                                    <img
                                                        src={
                                                            item.lampiran
                                                                ? `https://cms.depok.go.id/upload/${item.lampiran}`
                                                                : "/img/kecamatan/dsw/kesehatan.png"
                                                        }
                                                        alt="post 2"
                                                        className="h-80 w-full rounded-2xl object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                                                    />
                                                </a>
                                            </figure>

                                            <div className="rounded-2xl relative m-5 bottom-24 border border-t-0 border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700">
                                                <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                                                    <a
                                                        href={item.link ? item.link : ""}
                                                        target="_blank"
                                                        className="font-display text-jacarta-700 hover:text-yellow-600 dark:text-jacarta-200"
                                                    >
                                                        Sumber
                                                    </a>
                                                    <span className="dark:text-jacarta-400">
                                                        dari
                                                    </span>
                                                    <span className="inline-flex flex-wrap items-center space-x-1 text-yellow-600">
                                                        <a href={item.link ? item.link : ""} target="_blank">
                                                            {item.SiteName ? item.SiteName : ""}
                                                        </a>
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400 mb-2">
                                                    <span>{formatDate(item.tgl_publish)}</span>
                                                </div>
                                                <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-yellow-600 dark:text-white dark:hover:text-yellow-600">
                                                    <a href={item.link ? item.link : ""} target="_blank">
                                                        {item.title.slice(0, 38)}{" ..."}
                                                    </a>
                                                </h2>
                                                <p className="text-sm dark:text-jacarta-200" style={{ textTransform: 'inherit' }} dangerouslySetInnerHTML={{ __html: item?.content }}>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                </div>
                {/* <!-- Load More --> */}
                <div className="mt-2 text-center">
                    <a
                        href="https://berita.depok.go.id/"
                        className="inline-block rounded-full bg-yellow-600 py-3 px-8 text-center font-semibold text-white shadow-yellow-600-volume transition-all hover:bg-yellow-600-dark"
                    >
                        Selengkapnya
                    </a>
                </div>
            </div>
            {/* <!-- end kota tab --> */}
        </div>
    )
}

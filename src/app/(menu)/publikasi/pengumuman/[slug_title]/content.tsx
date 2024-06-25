import { getProfileSite } from '@/controllers/Controller';
import { getDetailPengumuman } from '@/controllers/PublikasiController';
import { DetailPengumumanProps } from '@/controllers/types/publikasi-controller.type';
import { formatDate } from '@/helpers/site';
import React from 'react'

export default async function Content({ pengumuman, pengumumanPopuler, params }: { pengumuman: DetailPengumumanProps[] | null, pengumumanPopuler: DetailPengumumanProps[] | null, params: { slug_title: string } }) {
    const profilSite = await getProfileSite();
    const PengumumanDetail = await getDetailPengumuman(params.slug_title);
    return (
        <>
            {PengumumanDetail && PengumumanDetail.map((itemBeritaUtama: any) => {
                return (
                    <article className="mb-12" key={itemBeritaUtama.id}>
                        <div className="relative lg:h-[25rem] h-[11rem] overflow-hidden rounded-2xl px-16 pt-16 pb-8 mb-8 shadow-md lg:px-24">
                            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                                <img src={itemBeritaUtama.lampiran ? `https://cms.depok.go.id/upload/${itemBeritaUtama.lampiran}` : '/img/kecamatan/dsw/kesehatan.png'} alt="gradient" className="h-fit w-full" />
                            </picture>
                            <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
                                <img src={itemBeritaUtama.lampiran ? `https://cms.depok.go.id/upload/${itemBeritaUtama.lampiran}` : '/img/kecamatan/dsw/kesehatan.png'} alt="gradient dark" className="h-fit w-full" />
                            </picture>
                        </div>

                        <article>
                            <div className="lg:flex lg:space-x-8">
                                <div className="article-content lg:w-2/3">
                                    <h2 className="text-3xl">{itemBeritaUtama.title}</h2>
                                    <p className="text-justify" dangerouslySetInnerHTML={{ __html: itemBeritaUtama?.content || '|' }}>
                                    </p>
                                    <div className="mb-16 flex items-center">
                                        <span className="mr-4 text-sm font-bold dark:text-jacarta-300">Share:</span>
                                        <div className="flex space-x-2">
                                            <a href={profilSite?.Facebook ?? 'Facebook'} target="_blank" className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook"
                                                    className="h-5 w-5 fill-jacarta-300 group-hover:fill-green-600 dark:group-hover:fill-white" role="img"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z">
                                                    </path>
                                                </svg>
                                            </a>
                                            <a href={profilSite?.Twitter ?? 'Twitter'} target="_blank" className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter"
                                                    className="h-5 w-5 fill-jacarta-300 group-hover:fill-green-600 dark:group-hover:fill-white" role="img"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                                    </path>
                                                </svg>
                                            </a>
                                            <a href={profilSite?.Instagram ?? 'Instagram'} target="_blank" className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram"
                                                    className="h-5 w-5 fill-jacarta-300 group-hover:fill-green-600 dark:group-hover:fill-white" role="img"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path
                                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                                    </path>
                                                </svg>
                                            </a>
                                            <a href={profilSite?.Youtube ?? 'Youtube'} target="_blank" className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="h-5 w-5 fill-jacarta-300 group-hover:fill-green-600 dark:group-hover:fill-white">
                                                    <path d="M43.6 9.4c-0.4-2.8-2.8-5.2-5.6-5.6C35.2 3.6 24 3 24 3S12.8 3.6 9.6 3.8C6.8 4.2 4.4 6.6 4 9.4C3.6 12.4 3 24 3 24s0.6 11.6 1 14.6c0.4 2.8 2.8 5.2 5.6 5.6C12.8 44.4 24 45 24 45s11.2-0.6 14.4-0.8c2.8-0.4 5.2-2.8 5.6-5.6C44.4 35.2 45 24 45 24S44.4 12.4 43.6 9.4zM18.8 32V16l13.6 8L18.8 32z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 lg:w-1/3">
                                    {pengumumanPopuler && pengumumanPopuler.slice(0, 3).map((item: any, index: number) => {
                                        return (
                                            <div className="mb-4" key={item.id}>
                                                <div className="mb-4 flex rounded-2.5xl border border-jacarta-100 bg-white p-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                                                    <img
                                                        src={itemBeritaUtama.lampiran ? `https://cms.depok.go.id/upload/${itemBeritaUtama.lampiran}` : '/img/kecamatan/dsw/kesehatan.png'}
                                                        alt="author"
                                                        className="mr-4 h-20 w-20 shrink-0 self-start object-cover rounded-lg md:mr-8 md:h-[7rem] md:w-[7rem]"
                                                    />
                                                    <div>
                                                        <span className="mb-3 mt-2 block font-display text-sm text-jacarta-700 dark:text-white">{item.title.slice(0, 52) + '..'}</span>
                                                        <p className="mb-4 text-xs dark:text-jacarta-300">
                                                            {item.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '').slice(0, 60)}
                                                        </p>
                                                        <div className="flex flex-wrap items-center space-x-2 text-xs text-jacarta-400">
                                                            <span>{formatDate(item.tgl_publish)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </article>
                    </article>
                );
            })}
        </>
    )
}

'use client'
import { InformasiSertaMertaProps } from '@/controllers/types/informasi-publik.type';
import { formatDate } from '@/helpers/site';
import React, { useState } from 'react'

export default function Content({ sertaMerta }: { sertaMerta: InformasiSertaMertaProps[] | null }) {
        
  // return JSON.stringify ( agenda )
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Misalnya, 10 item per halaman

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Kembalikan ke halaman pertama setiap kali pencarian berubah
  };

  // Filter dokumen berdasarkan nilai pencarian
  // Check if agenda is truthy before filtering
  const filteredsertaMerta = sertaMerta ? sertaMerta.filter((item: any) => {
    return item.title.includes(searchTerm.toLowerCase());
  }) : [];
  return (
    <>
    <div className="flex mb-4">
        <div className="ml-auto w-4/12 lg:w-1/4">
            <form action="search" className="relative basis-3/12">
            <input type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                placeholder="Search" />
            <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                className="h-4 w-4 fill-jacarta-500 dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                    d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                </svg>
            </span>
            </form>
        </div>
    </div>
    {filteredsertaMerta && filteredsertaMerta.map((item: any, index: number) => {
        const apiUrl = item.urlcontent
        ? item.urlcontent
        : `https://cms.depok.go.id/upload/file/${item.uploaddokumen}` || `https://cms.depok.go.id/upload/${item.lampiran}`;
        return (
        <div
            className="relative flex items-center my-2 rounded-2xl border border-jacarta-100 bg-white p-4 transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700" key={index}>
            <figure className="mr-5 self-start">
                <img src={item.lampiran ? `https://cms.depok.go.id/upload/${item.lampiran}` : '/img/about/357503819_568534888807533_6950311277093983664_n.jpg'} className="mr-4 h-24 object-cover w-48 shrink-0 self-start rounded-lg md:mr-8 md:h-[10rem] md:w-[10rem]"
                            alt="team" />
            </figure>

            <div className="w-full">
            <h3 className="mb-1 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                {item.title}
            </h3>
            <span className="mb-3 block text-sm text-jacarta-500">{item.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '')}</span>
            <div className="mt-8 flex items-center justify-between">
                <span className="block text-xs text-jacarta-300">{formatDate(item.tgl_publish)}</span>
                <a href={apiUrl} target="_blank">
                    <span className="text-sm dark:text-jacarta-200">Detail</span>
                </a>
            </div>
            </div>

        </div>
        )
        })}
    </>
  )
}

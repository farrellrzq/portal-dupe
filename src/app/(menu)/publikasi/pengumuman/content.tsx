"use client"
import Search from '@/components/dashboard/source/search';
import { CategoryProps, CmsContentProps } from '@/controllers/types/controller.type';
import { formatDate } from '@/helpers/site';
import Link from 'next/link';
import React from 'react'

export default function Content({ pengumuman, categories }: { pengumuman: CmsContentProps[] | null, categories: CategoryProps[] | null }) {

  return (
    <>
      <div className="flex mb-4">
        <div className="w-1/2 lg:w-3/4 mr-2">
          <div className="sm:col-span-3">
            <div className="mt-2">
              <select
                id="category"
                name="category"
                className="block w-full rounded-md border border-jacarta-100 py-1.5 p-1.5 text-gray-900 sm:max-w-xs sm:text-sm sm:leading-6 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-jacarta-300 dark:placeholder-white"
              >
                <option value="">All Categories</option>
                {categories && categories.map(category => (
                  <option key={category.Id} value={category.Category}>{category.Category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-1/2 lg:w-1/4">
          <Search />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">

        {pengumuman && pengumuman.map(item => (
          <article key={item.content_id}>
            <div
              className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
              <figure className="relative">
                {/* <Link href={`/Publikasi/detail-pengumuman/${item.slug_title}/${item.content_id}`}> */}
                <Link href={`/publikasi/pengumuman/${item?.slug_title}/${item?.content_id}`}>
                  <img src={item.lampiran ? `https://cms.depok.go.id/upload/${item.lampiran}` : '/img/kecamatan/dsw/kesehatan.png'} alt="item 5" className="w-full rounded-[0.625rem] max-h-48 object-cover"
                    loading="lazy" />
                </Link>
              </figure>
              <div className="mt-4 flex items-center justify-between">
                <button className="font-display text-sm font-semibold text-accent" data-bs-toggle="modal"
                  data-bs-target="#buyNowModal">
                  {formatDate(item.tgl_publish)}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Link href={`/publikasi/pengumuman/${item?.slug_title}/${item?.content_id}`}>
                  <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">{item.title}</span>
                </Link>
              </div>
              <div className="mt-2 text-sm">
                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">{item.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '').slice(0, 100)}</span>
              </div>

            </div>
          </article>
        ))}

      </div>
    </>
  )
}

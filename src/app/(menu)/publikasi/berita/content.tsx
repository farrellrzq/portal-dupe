"use client"
import Search from '@/components/dashboard/source/search';
import { CmsContentProps } from '@/controllers/types/controller.type';
import React, { useState } from 'react'

export default function Content({ berita }: { berita: CmsContentProps[] | null }) {

  return (
    <>
      <div>
        <div className="my-4">
          <h3 className="font-display px-4 text-3xl text-jacarta-700 dark:text-white">List Berita</h3>
          <span className="text-md px-4 pb-2">Berita Kecamatan</span>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 lg:w-1/4">
            <Search />
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
        {berita && berita.map((item: any, index: number) => (
          <article key={index}>
            <div className="overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg">
              <figure className="group overflow-hidden">
                {/* <a href={`/Publikasi/detail-berita/${item.slug_title}/${item.content_id}`}> */}
                <a href="#">
                  <img src={`https://cms.depok.go.id/upload/${item.lampiran}`} alt="post 2"
                    className="w-full object-cover transition-transform duration-[1600ms] h-60 will-change-transform group-hover:scale-105" />
                </a>
              </figure>

              <div
                className="rounded-b-[1.25rem] border border-t-0 border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700">
                <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                  <a href={item.link} target="_blank"
                    className="font-display text-jacarta-700 hover:text-green-600 dark:text-jacarta-200">Sumber</a>
                  <span className="dark:text-jacarta-400">in</span>
                  <span className="inline-flex flex-wrap items-center space-x-1 text-green-600">
                    <a href={item.link} target="_blank">{item.Author}</a>
                  </span>
                </div>
                <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400 mb-2">
                  <span>{item.created_at}</span>
                </div>
                <h2
                  className="mb-4 mt-2 font-display text-xl text-jacarta-700 hover:text-green-600 dark:text-white dark:hover:text-green-600">
                  <a href={`/publikasi/berita/${item?.slug_title}/${item?.content_id}`}> {item.title.slice(0, 38)} </a>
                </h2>
                <p className="mb-8 text-sm dark:text-jacarta-200 line-clamp-2">
                  {item.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '').slice(0, 100) + '...'}
                </p>
              </div>
            </div>
          </article>
        )
        )}
      </div>
    </>
  )
}

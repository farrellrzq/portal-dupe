import { getBerita } from '@/controllers/Controller';
import React from 'react'
import Content from './content';

export default async function MainSection() {
  const berita = await getBerita();
  const mainBerita = berita && berita.length > 0 ? berita[0] : null;
  return (
    <>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
      </picture>
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
      </picture>
      <div className="container">

        {mainBerita &&
          <article className="mb-[1.875rem] md:mb-16">
            <div className="flex flex-col overflow-hidden rounded-2.5xl transition-shadow hover:shadow-lg md:flex-row">
              <figure className="group overflow-hidden md:w-1/2">
                <a href={`/publikasi/berita/${mainBerita.slug_title}`}>
                  <img src={`https://cms.depok.go.id/upload/${mainBerita.lampiran}`}
                    alt="post 1"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105" />
                </a>
              </figure>

              <div
                className="rounded-b-[1.25rem] border border-jacarta-100 bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700 md:w-1/2 md:rounded-none md:rounded-r-[1.25rem]">
                <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
                  <a href="#" className="font-display text-jacarta-700 hover:text-accent dark:text-jacarta-200">Sumber</a>
                  <span className="dark:text-jacarta-400">in</span>
                  <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                    <a href="#">{mainBerita.SiteName}</a>
                  </span>
                </div>

                <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400 mb-4">
                  <span><time dateTime="2022-02-05">{mainBerita.created_at}</time></span>
                </div>
                <h2
                  className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent sm:text-3xl">
                  <a href={`/publikasi/berita/${mainBerita.slug_title}`}> {mainBerita.title.slice(0, 38)} </a>
                </h2>
                <p className="mb-8 dark:text-jacarta-200">
                  {mainBerita.content.replace(/<[^>]+>|&nbsp;|&#8203;|[\u200B-\u200D\uFEFF]|-->/g, '').slice(0, 100) + '...'}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <a href={`/publikasi/berita/${mainBerita.slug_title}`}>
                    <button className="rounded-full bg-green-600 my-6 lg:my-0 px-6 py-4 lg:py-2 font-display text-sm text-white hover:bg-green-600-dark">
                      Lihat Selengkapnya
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </article>
        }

        <Content berita={berita} />
      </div>
    </>
  )
}

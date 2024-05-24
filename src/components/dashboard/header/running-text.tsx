import { getBerita } from '@/controllers/Controller';
import React from 'react'

export default async function RunningText() {
  const berita = await getBerita();

  return (
    berita && berita.map((item: any, index: number) => {
      return (
        <a href={`/publikasi/berita/${item.slug_title}/${item.content_id}`} className="text-jacarta-600 hover:text-accent dark:hover:text-accent" key={index}>
          <span className="flex text-xs tracking-wide basis-1/2 text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent mr-2 w-96 my-1 running-text">
            {item.title.slice(0, 50)}
          </span>
        </a>
      )
    })
  )
}

import React from 'react'
import Content from './content';
import { getAgendaKegiatan } from '@/controllers/PublikasiController';

export default async function MainSection() {
  const agenda = await getAgendaKegiatan();
  const mainAgenda = agenda && agenda.length > 0 ? agenda[0] : null;
  return (
    <>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
      </picture>
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
      </picture>
      <div className="container">

        {mainAgenda &&
          <article>
            <div className="relative overflow-hidden rounded-2.5xl mb-4 bg-white dark:bg-jacarta-700">
              <figure className="relative">
                <a
                  data-bs-toggle="modal"
                  data-bs-target={`.video-lightbox-${mainAgenda.Id}`}
                  target="_blank"
                  className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20 cursor-pointer">
                  <img src={mainAgenda.Media ? `https://cms.depok.go.id/upload/gallery/${mainAgenda.Media}` : '/img/kecamatan/dsw/kesehatan.png'}
                    alt="mainAgenda 20"
                    className="w-full lg:h-72 object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                    height="290" width="959" />
                </a>
              </figure>
              <div className="pointer-events-none absolute bottom-0 w-full p-5">
                <h2 className="font-display text-2xl leading-none text-white">{mainAgenda.Title}</h2>
                <span className="text-2xs text-white">Upacara Kemerdekaan</span>
              </div>
            </div>
          </article>
        }

        <Content agenda={agenda} />
      </div>
    </>
  )
}

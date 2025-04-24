import React from 'react'
import Content from './content'
import { getAgendaKegiatan } from '@/controllers/PublikasiController'

export default async function agenda() {
    const agenda = await getAgendaKegiatan();
  return (
    <div className="lg:w-1/2 m-2">
        <h2 className="mb-2 text-center lg:mt-0 font-display text-3xl text-jacarta-700 dark:text-white">
            Agenda Kecamatan
        </h2>
        <p className="text-center mb-8 text-jacarta-700 dark:text-white">
            Pengumuman tentang Kecamatan baik kegiatan maupun agenda
            terdekat yang akan diadakan di
        </p>
        <Content agenda={agenda} />
    </div>
  )
}

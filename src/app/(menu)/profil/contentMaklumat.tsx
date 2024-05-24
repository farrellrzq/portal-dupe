import { getMaklumat } from '@/controllers/ProfilController'
import React from 'react'

export default async function contentMaklumat() {
  const maklumat = await getMaklumat();
  return (
    <div className="rounded-t-[15rem] bg-white dark:bg-jacarta-700 md:p-[4.25rem]">
      <div className="container mx-auto">
        {maklumat && maklumat.map((item: any, index: number) => {
          return (
            <img src={item.lampiran ? `https://cms.depok.go.id/upload/${item.lampiran}` : ''} className="mx-auto w-full"
              alt="team" key={index} />
          )
        })}
      </div>
    </div>
  )
}

import { getMotto } from '@/controllers/ProfilController'
import React from 'react'

export default async function contentMotto() {
  const motto = await getMotto();

  return (
    <div className="rounded-t-[15rem] bg-white dark:bg-jacarta-700 md:p-[4.25rem]">
      <div className="container mx-auto">
        {motto && motto.map((item: any, index: number) => {
          return (
            <img src={item.lampiran ? `https://cms.depok.go.id/upload/${item.lampiran}` : ''} className="mx-auto w-full"
              alt="team" key={index} />
          )
        })}
      </div>
    </div>
  )
}

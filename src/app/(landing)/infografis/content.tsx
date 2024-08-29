import { InfografisProps } from '@/controllers/types/home-controller.type'
import React from 'react'

export default function Content({ infografis }: { infografis: InfografisProps[] | null }) {

  return (
    <div className="swiper single-slider text-center m-10 mb-0">
      <div className="swiper-wrapper">
        {infografis &&
          infografis.map((item: any, index: number) => (
            <div className="swiper-slide" key={index}>
              <img
                src={item.image ? item.image : ""}
                alt="cek"
                className="h-fit inline-block"
              />
            </div>
          ))}
      </div>
    </div>
  )
}

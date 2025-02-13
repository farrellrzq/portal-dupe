'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { InfografisProps } from '@/controllers/types/home-controller.type';

export default function Content({ infografis }: { infografis: InfografisProps[] | null }) {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        className="single-slider text-center m-10 mb-0"
      >
        {infografis &&
          infografis.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <img
                src={item.Attachment && item.Attachment.length > 0 
                  ? `https://cmsdsw.depok.go.id/api/assets/${item.Attachment[0].Name}` 
                  : ""}
                alt="cek"
                className="h-fit inline-block"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Tombol Navigasi */}
      <div className="mt-6 flex justify-center space-x-3">
        <div className="swiper-button-prev group z-10 !flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 group-hover:fill-green-600"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
          </svg>
        </div>
        <div className="swiper-button-next group z-10 !flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 group-hover:fill-green-600"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </div>
      </div>
    </>
  );
}

import { getInfografis } from '@/controllers/HomeController';
import React from 'react'
import Content from './content';

export default async function infografis() {
    const infografis = await getInfografis();
    return (
        <div className="lg:w-3/5 w-full relative">
            <h2 className="mb-2 text-center font-display text-3xl text-jacarta-700 dark:text-white">
                Infografis Kota
            </h2>
            <p className="text-center mb-16 text-jacarta-700 dark:text-white">
                Infografis Kota Smart City yang berisi tentang informasi Kota
                Depok
            </p>
            <Content infografis={infografis} />
            <div className="mt-6 flex justify-center space-x-3">
                <div className="swiper-button-prev swiper-button-prev-5 group z-10 !flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
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
                <div className="swiper-button-next swiper-button-next-5 group z-10 !flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
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
        </div>
    )
}

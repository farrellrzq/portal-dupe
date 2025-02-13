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
            {/* <!-- Slider --> */}
            <Content infografis={infografis} />
            {/* <!-- Slider Navigation --> */}
        </div>
    )
}

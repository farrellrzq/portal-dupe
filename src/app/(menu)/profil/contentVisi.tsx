import { getProfileSite } from '@/controllers/Controller'
import React from 'react'
import Image from 'next/image'

export default async function contentVisi() {
    const profilSite = await getProfileSite();
    return (
        <div
            className="flex flex-wrap rounded-t-[15rem] bg-white dark:bg-jacarta-700 md:flex-nowrap md:space-x-8 md:p-[4.25rem] lg:space-x-16">
            <div className="lg:flex lg:justify-between">
                <div className="py-20 px-12 lg:w-[100%] lg:pl-16">
                    <div className="">

                        <h1 className="mb-4 font-display text-4xl font-semibold text-jacarta-700 dark:text-white">Visi & Misi
                        </h1>

                        <h5 className="mb-2 font-semibold text-jacarta-700 dark:text-white">Visi</h5>
                        <p className="mb-10 dark:text-jacarta-300" dangerouslySetInnerHTML={{ __html: profilSite?.Visi || '|' }}>
                        </p>

                        <h5 className="mb-2 font-semibold text-jacarta-700 dark:text-white">Misi</h5>
                        <div className="mb-10 dark:text-jacarta-300" dangerouslySetInnerHTML={{ __html: profilSite?.Misi || '' }} />
                    </div>
                </div>
                {/* <div className="lg:w-[45%]">
                    <div className="relative">
                        <Image src="/img/about/Enter OTP-cuate.png" alt="" className="animate-fly" width={500}
                            height={500} />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

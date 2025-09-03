import { getProfileSite } from '@/controllers/Controller'
import React from 'react'
import Image from 'next/image'
import { ProfileSiteProps } from '@/controllers/types/controller.type'; // 1. Impor tipe data

export default async function ContentVisi() {
    const profilSite = await getProfileSite();

    // 2. Terapkan "Type Guard" untuk membersihkan data
    const cleanProfileSite: ProfileSiteProps | null =
        (profilSite && !('error' in profilSite)) ? profilSite : null;

    return (
        <div
            className="flex flex-wrap rounded-t-[15rem] bg-white dark:bg-jacarta-700 md:flex-nowrap md:space-x-8 md:p-[4.25rem] lg:space-x-16">
            <div className="lg:flex lg:justify-between">
                <div className="py-20 px-12 lg:w-[100%] lg:pl-16">
                    <div className="">

                        <h1 className="mb-4 font-display text-4xl font-semibold text-jacarta-700 dark:text-white">Visi & Misi
                        </h1>

                        {/* 3. Gunakan variabel yang sudah aman */}
                        <h5 className="mb-2 font-semibold text-jacarta-700 dark:text-white">Visi</h5>
                        <p className="mb-10 dark:text-jacarta-300" dangerouslySetInnerHTML={{ __html: cleanProfileSite?.Visi || 'Informasi visi tidak tersedia.' }}>
                        </p>

                        <h5 className="mb-2 font-semibold text-jacarta-700 dark:text-white">Misi</h5>
                        <div className="mb-10 dark:text-jacarta-300" dangerouslySetInnerHTML={{ __html: cleanProfileSite?.Misi || 'Informasi misi tidak tersedia.' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

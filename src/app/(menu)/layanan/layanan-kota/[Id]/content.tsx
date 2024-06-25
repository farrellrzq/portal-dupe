// 'use client'
import useModalState from '@/components/dashboard/useModalState';
import { getDetailLayananKota } from '@/controllers/PelayananController';
import { LayananKotaProps, LayananProps } from '@/controllers/types/home-controller.type';
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton';

export default async function Content({ layanan, layananKota, params }: { layanan: LayananProps[] | null, layananKota: LayananKotaProps[] | null, params: { Id: string } }) {
    const LayananKotaDetail = await getDetailLayananKota(params.Id);
    return (
       <>
        <div
        className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10"
        >
            <div className="grid lg:gap-5 gap-2 grid-cols-2 md:grid-cols-4 mt-6">
            {LayananKotaDetail &&
                LayananKotaDetail
                .map((item: {
                    URLMenu: string; Id: any; ImageMenu: any; TitleMenu: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
                    }, index: React.Key | null | undefined) => (
                    <div key={index} className="rounded-2lg border border-jacarta-100 bg-white p-2 lg:p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700">
                    {item.URLMenu === "" ? (
                    <a href={`/Layanan/layanan-detail-kota/${item.Id}`} key={index}>
                        <img
                        src={item.ImageMenu ? `https://cms.depok.go.id/upload/externalLogo/${item.ImageMenu}` : '/img/kecamatan/dsw/kesehatan.png'}
                        className="mx-auto mb-6 h-[5.125rem] w-[5.125rem]"
                        alt="team"
                        />
                        <h3 className="font-display text-md text-jacarta-700 dark:text-white">{item.TitleMenu}</h3>
                    </a>
                    ) : (
                    <Content layanan={null} layananKota={null} params={params} />
                    )}
                </div>
                ))
            }
            </div>
        </div>
       </>
    )
}



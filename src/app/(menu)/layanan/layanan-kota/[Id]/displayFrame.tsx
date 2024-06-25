'use client'
import { getDetailLayananKota } from '@/controllers/PelayananController';
import { getAgendaKegiatan } from '@/controllers/PublikasiController'
import { LayananKotaProps, LayananProps } from '@/controllers/types/home-controller.type';
import React, { useState } from 'react'

export default async function Content({ layanan, layananKota, params }: { layanan: LayananProps[] | null, layananKota: LayananKotaProps[] | null, params: { Id: string } }) {
    const LayananKotaDetail = await getDetailLayananKota(params.Id);
    const agenda = await getAgendaKegiatan();
    const [videoUrl, setVideoUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
  
    const displayIframe = (url: string) => {
      setVideoUrl(url);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setVideoUrl('');
      setShowModal(false);
    };
    <>
    {LayananKotaDetail &&
    LayananKotaDetail
    .map((item: {
        URLMenu: string; Id: any; ImageMenu: any; TitleMenu: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
        }, index: React.Key | null | undefined) => (
        <div
            onClick={() => displayIframe(item.URLMenu)}
            style={{ cursor: 'pointer' }}
            key={index}
        >
            <img
            src={item.ImageMenu ? `https://cms.depok.go.id/upload/externalLogo/${item.ImageMenu}` : '/img/kecamatan/dsw/kesehatan.png'}
            className="mx-auto mb-6 h-[5.125rem] w-[5.125rem]"
            alt="team"
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">{item.TitleMenu}</h3>
        </div>
        ))
    }
    </>
}
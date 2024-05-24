
import React from 'react'
import Content from './content';
import { getDokumenProduk } from '@/controllers/PublikasiController';
import ContentGradient from '@/components/dashboard/source/content-gradient';

export default async function MainSection() {
  const dokumenProduk = await getDokumenProduk();

  return (
    <>
      <ContentGradient />

      <div className="container py-8">
        <Content dokumenProduk={dokumenProduk} />
      </div>
    </>
  )
}

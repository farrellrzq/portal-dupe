
import React from 'react'
import Content from './content';
import { getPengumuman } from '@/controllers/PublikasiController';
import ContentGradient from '@/components/dashboard/source/content-gradient';
import { getCategories } from '@/controllers/Controller';

export default async function MainSection() {
  const pengumuman = await getPengumuman();
  const categories = await getCategories({kanalType: 'K008'});

  return (
    <>
      <ContentGradient />

      <div className="container py-8">
        <Content pengumuman={pengumuman} categories={categories} />
      </div>
    </>
  )
}

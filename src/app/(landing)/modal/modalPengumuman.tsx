
import { getPengumuman } from '@/controllers/HomeController'
import React from 'react'
import Content from './content';

export default async function modalPengumuman() {
    const pengumuman = await getPengumuman();

  return (
    <Content pengumuman={pengumuman} />
  )
}

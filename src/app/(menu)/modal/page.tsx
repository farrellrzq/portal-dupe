import React from 'react'
import Content from './content'
import { getBerita } from '@/controllers/HomeController';

export default async function ModalSearchBerita() {
  const [berita] = await Promise.all([
    getBerita({ limit: '100' }),
  ]);    
  return (
    <div
        className="modal fade"
        id="walletModal"
        tabIndex={-1}
        aria-labelledby="walletModalLabel"
        aria-hidden="true"
      >
        <Content berita={berita} />
    </div>
  )
}

import { getMenu } from '@/controllers/PublikasiController';
import React from 'react'
import ContentMenuSatu from './content';
import ContentMenuDua from './content';
import ContentMenuTiga from './content';

export default async function page() {
    
  const menu = await getMenu();
  return (
    <main className="pt-[5.5rem] lg:pt-24">
      <section className="hero relative py-16 dark:bg-jacarta-800 bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl">
            {menu && menu[0] ? menu[0].TitleMenu : 'Menu Tidak Ditemukan'}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24">
        <picture className="pointer-events-none absolute -z-10 dark:hidden">
          <img src="/img/gradient.jpg" alt="gradient" className="w-full" />
        </picture>
        <picture className="pointer-events-none absolute -z-10 dark:hidden">
          <img src="/img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>
        <ContentMenuTiga menu={menu} />
      </section>
    </main>
  )
}

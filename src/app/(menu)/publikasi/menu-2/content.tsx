import { ExlinkProps } from '@/controllers/types/controller.type'
import React from 'react'

export default function ContentMenuDua({ menu }: { menu: ExlinkProps[] | null }) {
//   return JSON.stringify ( menu[1].URLMenu )

  return (
    <div className="rounded-t-[15rem] bg-white mt-[5.5rem] dark:bg-jacarta-700 md:p-[4.25rem]">
      <div className="container mx-auto">
        {menu &&
            menu.slice(1, 2).map((item: any, index: number) => {
            return (
            <iframe
            src={item.URLMenu}
            width="1200"
            height="600"
            title="Video Modal"
            key={index}
            ></iframe>
            );
        })}
        </div>
    </div>
  )
}

import { ExlinkProps } from '@/controllers/types/controller.type';
import React from 'react';

export default function ContentMenuDua({ menu = [] }: { menu: ExlinkProps[] | null }) {
  return (
    <div className="rounded-t-[15rem] bg-white mt-[5.5rem] dark:bg-jacarta-700 md:p-[4.25rem]">
      <div className="container mx-auto">
        {menu && menu.length > 1 && menu[1].URLMenu ? (
          menu.slice(1, 2).map((item: ExlinkProps, index: number) => (
            item.URLMenu ? (  // Checking if URLMenu is not null or undefined
              <iframe
                src={item.URLMenu}
                width="1200"
                height="600"
                title="Video Modal"
                key={index}
              ></iframe>
            ) : (
              <p key={index}>URL not available for this menu item.</p>
            )
          ))
        ) : (
          <p>Menu item not available.</p>
        )}
      </div>
    </div>
  );
}

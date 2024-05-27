import { ExlinkProps } from '@/controllers/types/controller.type';
import Link from 'next/link'
import React from 'react'

export default async function HeaderMenu({ menu }: { menu: ExlinkProps[] | null }) {
  // Kondisi untuk menampilkan atau menyembunyikan elemen berdasarkan data menu
  if (!menu || menu.length === 0) {
    return (
      <li className="js-nav-dropdown group relative" style={{ display: 'none' }}>
        {/* Konten tersembunyi */}
      </li>
    );
  }

  return (
    <li className="js-nav-dropdown group relative">
      <a href="#"
        className="dropdown-toggle flex ml-[0.475rem] items-center py-3.5 font-display text-sm text-jacarta-700 dark:text-white lg:px-3"
        id="navDropdown-5" aria-expanded="false" role="button" data-bs-toggle="dropdown">
        {menu[0].Code}
        &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className="fill-jacarta-700"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
        </svg>
      </a>
      <ul
        className="dropdown-menu group-hover:visible left-52 lg:invisible top-[-15%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
        aria-labelledby="navDropdown-5">
        {menu.map((item: any, index: number) => (
          <li key={index}>
            <Link href={`/publikasi/${item.Description}`}
              className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 dark:hover:bg-jacarta-600">
              <span className="font-display text-sm text-jacarta-700 dark:text-white">{item.TitleMenu}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

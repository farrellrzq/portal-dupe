import { getProfileSite } from '@/controllers/Controller';
import Link from 'next/link'
import React from 'react'

export default async function MidFooter() {
  const profileSite = await getProfileSite();
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    profileSite?.Alamat ?? ""
  )}`;

  return (
    <div className="col-span-full sm:col-span-3 md:col-span-3 md:col-start-6">
      <h3 className="mb-6 font-display text-lg text-jacarta-700 dark:text-white">
        Hubungi Kami
      </h3>
      <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
        <li>
          <Link href={googleMapsUrl} className="flex" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="min-w-6 min-h-6 w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;
            <span> {profileSite?.Alamat ?? "Diskominfo Depok"}</span>
          </Link>
        </li>
        <li className="pt-3">
          <a
            href={`tel:${profileSite?.Telp
              ? profileSite.Telp.replace(/\D/g, "")
              : "+622129402276"
              }`}
            className="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="min-w-6 min-h-6 w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;
            {profileSite?.Telp ?? "(021) 29402276 dan (021) 7764410"}
          </a>
        </li>
        <li className="pt-3">
          <a
            href={`mailto:${profileSite?.Email ?? "noone@gmail.com"}`}
            className="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="min-w-6 min-h-6 w-6 h-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            &nbsp;
            <span>{profileSite?.Email ?? "noone@gmail.com"}</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

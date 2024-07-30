import { getProfileSite } from '@/controllers/Controller';
import Link from 'next/link'
import React from 'react'

export default async function BottomFooter() {
  const profileSite = await getProfileSite();
  return (
    <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
      <ul className="flex flex-col space-y-1 dark:text-jacarta-300 mt-5">
        <li className="flex">
          <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400">
            <Link href="/Component/termsCondition">
              <span className="font-display text-sm text-jacarta-700 dark:text-white">
                Terms & Condition
              </span>
            </Link>
          </div>

          <div className="ml-5 flex flex-wrap items-center space-x-2 text-base text-jacarta-400">
            <Link href="/Component/privacyPage">
              <span className="font-display text-sm text-jacarta-700 dark:text-white">
                Privacy & Policy
              </span>
            </Link>
          </div>
        </li>
      </ul>

      <div className="">
        <ul className="dark:text-jacarta-300 mt-5">
          <li className="inline-block">
            <div className="text-sm text-jacarta-400 float-right webkit-center">
              <div className="mr-5 flex flex-wrap items-center space-x-2 text-base text-jacarta-400">
                <span className="text-sm dark:text-jacarta-400">
                  &copy; {new Date().getFullYear()} Copyright{" "}
                  {profileSite?.Name ?? "Setda"} I Portal Resmi Kota Depok. All
                  Rights Reserved
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

"use client"
import { CmsContentProps } from '@/controllers/types/controller.type'
import { StandarLayananProps } from '@/controllers/types/pelayanan-controller.type'
import React, { useEffect, useState } from 'react'

export default function Content({ StandarLayanan }: { StandarLayanan: CmsContentProps[] | null }) {
  const [standarPelayanan, setStandarPelayanan] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    fetch('API_URL')
      .then(response => response.json())
      .then(data => setStandarPelayanan(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <>
    {StandarLayanan && StandarLayanan.map((item: any, index: number) => {
        return (
          <div key={index}>
            <div className="mb-10 dark:text-jacarta-300 py-24 px-12" key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
            <div className="flex items-center my-4">
              <input id="default-checkbox" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saya Setuju dengan syarat & ketentuan</label>
            </div>
            <button type="button" disabled={!isChecked}  onClick={() => window.location.href='/layanan/list-standar-layanan'} className="rounded-full float-right bg-[#50d71e] px-6 py-4 my-4 font-display text-sm text-jacarta-200 hover:text-white hover:bg-green-600">
              Selanjutnya          
            </button>
          </div>
        )
      })
      }
  </>
  )
}

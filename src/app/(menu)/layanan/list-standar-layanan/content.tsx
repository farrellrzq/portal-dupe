import { ListStandarPelayananProps } from '@/controllers/types/pelayanan-controller.type';
import React from 'react'

export default function Content({ listStandarPelayanan }: { listStandarPelayanan: ListStandarPelayananProps[] | null }) {
  return (
    <>
    {listStandarPelayanan && listStandarPelayanan.map((item: any, index: number) => {
        // Mendapatkan ekstensi file dari URL
        const fileExtension = item.uploaddokumen.split('.').pop();
                    
        // Fungsi untuk menentukan jenis file berdasarkan ekstensi
        const getFileType = (extension: string) => {
            if (extension === 'pdf') {
            return 'PDF';
            } else if (extension === 'doc' || extension === 'docx') {
            return 'Word';
            } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            return 'Image';
            } else {
            return 'File'; // Untuk jenis file lainnya
            }
        };
        return (
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {index + 1}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {item.title}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <a href={`https://cms.depok.go.id/upload/file/${item.uploaddokumen}`} download>
            <div className="flex place-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 mr-2 h-6">
                <path strokeLinecap="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                <p className="text-base text-gray-900">
                {getFileType(fileExtension)}
                </p>
            </div>
            </a>
        </td>

        </tr>
        )
    })}
    </>
  )
}

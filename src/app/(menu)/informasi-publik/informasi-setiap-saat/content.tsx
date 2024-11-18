'use client'
import { InformasiSetiapSaatProps } from '@/controllers/types/informasi-publik.type';
import React, { useState } from 'react';

export default function Content({ SetiapSaat }: { SetiapSaat: InformasiSetiapSaatProps[] | null }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredSetiapSaat = SetiapSaat
    ? SetiapSaat.filter((item: any) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <>       
      <div className="flex mb-4">
        <div className="ml-auto w-1/4">
          <form action="search" className="relative ml-12 mr-8 basis-3/12">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              placeholder="Search"
            />
            {/* Search Icon */}
          </form>
        </div>
      </div>
      {filteredSetiapSaat && filteredSetiapSaat
        .filter((sort: any) => sort.ParentId === null)
        .reverse()
        .map((item: any) => {
          const apiUrl = item.urlcontent || `https://cms.depok.go.id/upload/file/${item.uploaddokumen || item.lampiran || 'default-file.pdf'}`;
          
          return (
            <div role="table" className="w-full overflow-y-auto my-5 rounded-lg border bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white" key={item.content_id}>
              {/* Render Parent Item */}
              {filteredSetiapSaat.filter((sort: any) => sort.ParentId === item.content_id).reverse().map((parent: any) => {
                const parentUrl = parent.urlcontent || `https://cms.depok.go.id/upload/file/${parent.uploaddokumen || parent.lampiran || 'default-file.pdf'}`;

                return (
                  <React.Fragment key={parent.content_id}>
                    {/* Render Parent Content */}
                    {SetiapSaat && SetiapSaat.filter((indx: any) => indx.ParentId === parent.content_id).map((child: any) => {
                      const childUrl = child.urlcontent || `https://cms.depok.go.id/upload/file/${child.uploaddokumen || child.lampiran || 'default-file.pdf'}`;
                      return (
                        <div className="ml-12!" style={{ marginLeft: "50px" }} key={child.content_id}>
                          {/* Render Child Content */}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          );
      })}
    </>
  );
}

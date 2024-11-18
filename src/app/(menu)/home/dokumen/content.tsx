import { DokumenProps } from '@/controllers/types/home-controller.type';
import { formatDate } from '@/helpers/site';
import React from 'react'

export default function Content({ dokumen }: { dokumen: DokumenProps[] | null }) {
    return (
        <div className="mb-10 shrink-0 basis-8/12 p-2.5 space-y-5 lg:mb-0">
            {dokumen &&
                dokumen.slice(0, 3).map((item: any, index: number) => {
                    return (
                        <div className="relative flex items-center rounded-2.5xl border border-jacarta-100 bg-white p-7 transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700" key={index}>
                            <div>
                                <h3 className="mb-2 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                                    {item.title ? item.title : ""}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <button className="font-display text-sm font-semibold text-green-600">
                                        {formatDate(item.tgl_publish) ? formatDate(item.tgl_publish) : ""}
                                    </button>
                                </div>
                            </div>
                            <div className="ml-auto rounded-full border border-jacarta-100 p-3 dark:border-jacarta-600">
                                <a
                                    href={`https://cms.depok.go.id/upload/file/${item.uploaddokumen}`}
                                    target="_blank"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 hover:text-green"
                                    >
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    );
                })}
        </div>
    )
}

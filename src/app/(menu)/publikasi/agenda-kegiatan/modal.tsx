import { getAgendaKegiatan } from '@/controllers/PublikasiController'
import React from 'react'

export default async function ModalStores() {
  const agenda = await getAgendaKegiatan();

  return (
    <>
      {agenda && agenda.map(item => (
        <div
          key={item.Id}
          className={`modal fade video-lightbox js-video-lightbox video-lightbox-${item.Id}`} // Menggunakan kelas CSS
          tabIndex={-1}
          aria-label="Youtube Modal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-6 w-6 fill-jacarta-700"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                    />
                  </svg>
                </button>
                <div className="rounded-2.5xl bg-white p-12 dark:bg-jacarta-700">
                  <h2 className="mb-5 font-display text-3xl text-jacarta-700 dark:text-white">
                    {item.Title}
                  </h2>
                  <p className="mb-8 text-lg leading-normal dark:text-jacarta-300">
                    {item.Deskripsi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      ))}
    </>
  )
}

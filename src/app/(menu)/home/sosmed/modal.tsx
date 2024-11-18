import React from 'react'

export default function modal() {
  return (
    <div
        className={`modal fade video-lightbox js-video-lightbox medsos`} // Menggunakan kelas CSS
        tabIndex={-1}
        aria-label="Youtube Modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-6 w-6 fill-jacarta-700"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
              <div className="bg-white border rounded-md shadow-sm p-1 mx-1 max-w-[540px] min-w-[326px] w-99.375vw">
                <div className="p-4">
                  <a
                    href="https://www.instagram.com/pemkotdepok/?hl=en"
                    className="block bg-white line-height-0 p-0 text-center text-decoration-none w-full"
                    target="_blank"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-300 rounded-full flex-grow-0 h-10 mr-4 w-10"></div>
                      <div className="flex flex-col flex-grow-1 justify-center">
                        <div className="bg-gray-300 rounded h-4 mb-2 w-32"></div>
                        <div className="bg-gray-300 rounded h-4 w-16"></div>
                      </div>
                    </div>
                    <div className="pt-19%"></div>
                    <div className="block h-50px mx-auto mb-12 w-50px">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 60 60"
                        version="1.1"
                        xmlns="https://www.w3.org/2000/svg"
                        xmlnsXlink="https://www.w3.org/1999/xlink"
                      >
                        {/* SVG path goes here */}
                      </svg>
                    </div>
                    <div className="pt-8">
                      <div className="text-blue-500 font-semibold text-base">
                        View this post on Instagram
                      </div>
                    </div>
                    {/* Additional content goes here */}
                  </a>
                  <p className="text-gray-500 font-normal text-sm line-height-17px mb-0 mt-8 overflow-hidden px-8 py-7 text-center text-ellipsis whitespace-nowrap">
                    <a
                      href="https://www.instagram.com/pemkotdepok/?hl=en"
                      className="text-gray-500 font-normal text-sm"
                      target="_blank"
                    >
                      A post shared by Diskominfo Kota Depok (@diskominfodepok)
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

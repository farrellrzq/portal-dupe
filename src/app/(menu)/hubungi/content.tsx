'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function Content() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subjek: '',
        pesan: '',
      });
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const res = await fetch('https://cms.depok.go.id/ViewPortal/kotak_masuk?siteId=79', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          // Handle response
        } catch (error) {
          // Handle error
        }
      };
    
      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  return (
    <form onSubmit={handleSubmit}>
        <div className="flex space-x-7">
            <div className="mb-6 w-1/2">
            <label htmlFor="name" className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">Name<span className="text-red">*</span></label>
            <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-blue/10 focus:ring-blue dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                id="name"
                type="text"
                required
            />
            </div>
            <div className="mb-6 w-1/2">
            <label htmlFor="email" className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">Email<span className="text-red">*</span></label>
            <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-blue/10 focus:ring-blue dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                id="email"
                type="email"
                required
            />
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="message" className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">Message<span className="text-red">*</span></label>
            <textarea
            value={formData.pesan}
            onChange={handleTextareaChange}
            className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-blue/10 focus:ring-blue dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
            required
            name="pesan"
            rows={5}
            ></textarea>
        </div>
        {/* ...checkbox and submit button */}
        <div className="mb-6 flex items-center space-x-2">
        <input type="checkbox" id="contact-form-consent-input" name="agree-to-terms"
        className="h-5 w-5 self-start rounded border-jacarta-200 text-blue checked:bg-blue focus:ring-blue/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600" />
        <label htmlFor="contact-form-consent-input" className="text-sm dark:text-jacarta-200">Saya Menyetujui <a
        href="tos.html" className="text-blue">Ketentuan Layanan</a></label>
        </div>

        <button type="submit" className="rounded-full bg-blue-900 py-3 px-8 text-center font-semibold text-jacarta-600 shadow shadow-blue-volume transition-all bg-white hover:bg-green-700 hover:text-white" id="contact-form-submit">
        Kirim
        </button>

        <div id="contact-form-notice" className="relative mt-4 hidden rounded-lg border border-transparent p-4"></div>
    </form>
  )
}

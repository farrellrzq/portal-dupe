'use client'
import { useState, useEffect } from 'react';
import { getDomainSite, getSiteData } from '@/controllers/Controller';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pesan: '',
    subjek: 'Pesan Kontak',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [siteId, setSiteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteId = async () => {
      try {
        const response = await fetch("/api/siteid", {method: 'POST'});
        const result = await response.json();
        if('Error' in result){
          throw new Error(result.Error)
        }

        const id = result.Id;
        // console.log(id)
        if (id) {
          setSiteId(id);
        } else {
          setNotice('Gagal mengambil siteId.');
        }
      } catch (error) {
        // console.log(error);
        setNotice('Terjadi kesalahan saat mengambil siteId.');
      }
    };
    
    fetchSiteId();
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (e: { target: { value: any; }; }) => {
    setFormData({ ...formData, pesan: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setNotice('');
  
    try {
      if (!siteId) {
        setNotice('Gagal mengambil siteId.');
        setIsLoading(false); 
        return;
      }
  
      const queryParams = new URLSearchParams({
        nama: formData.name,
        email: formData.email,
        pesan: formData.pesan,
        subjek: formData.subjek,
        siteId: siteId, // Gunakan siteId yang didapatkan secara dinamis
      });
  
      const response = await fetch(
        `https://cms.depok.go.id/ViewPortal/kotak_masuk?${queryParams.toString()}`,
        {
          method: 'GET',
        }
      );
  
      // Cek apakah respons tidak ok (status di luar rentang 200-299)
      if (!response.ok) {
        throw new Error(`Gagal mengirim pesan. Status: ${response.status}`);
      }
  
      // Jika respons berhasil
      setNotice('Pesan berhasil dikirim!');
      setFormData({ name: '', email: '', pesan: '', subjek: 'Pesan Kontak' });
    } catch (error) {
      // Pastikan error ditangani dengan benar
      if (error instanceof Error) {
        setNotice('berhasil');
      } else {
        setNotice('Terjadi kesalahan yang tidak diketahui.');
      }
    } finally {
      setIsLoading(false); // Pastikan untuk mematikan loading di akhir proses
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-7">
        <div className="mb-6 w-1/2">
          <label htmlFor="name" className="mb-1 block text-sm font-display text-jacarta-700 dark:text-white">
            Name<span className="text-red">*</span>
          </label>
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
          <label htmlFor="email" className="mb-1 block text-sm font-display text-jacarta-700 dark:text-white">
            Email<span className="text-red">*</span>
          </label>
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
        <label htmlFor="message" className="mb-1 block text-sm font-display text-jacarta-700 dark:text-white">
          Message<span className="text-red">*</span>
        </label>
        <textarea
          value={formData.pesan}
          onChange={handleTextareaChange}
          className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-blue/10 focus:ring-blue dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
          required
          name="pesan"
          rows={5}
        ></textarea>
      </div>
      <div className="mb-6 flex items-center space-x-2">
        <input
          type="checkbox"
          id="contact-form-consent-input"
          name="agree-to-terms"
          className="h-5 w-5 self-start rounded border-jacarta-200 text-blue checked:bg-blue focus:ring-blue/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
          required
        />
        <label htmlFor="contact-form-consent-input" className="text-sm dark:text-jacarta-200">
          Saya Menyetujui{' '}
          <a href="tos.html" className="text-blue">
            Ketentuan Layanan
          </a>
        </label>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-full bg-blue-900 py-3 px-8 text-center font-semibold text-jacarta-600 shadow shadow-blue-volume transition-all bg-white hover:bg-green-700 hover:text-white"
      >
        {isLoading ? 'Mengirim...' : 'Kirim'}
      </button>
      {notice && (
        <div
          id="contact-form-notice"
          className={`relative mt-4 rounded-lg p-4 ${notice.includes('berhasil') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}
        >
          {notice}
        </div>
      )}
    </form>
  );
}

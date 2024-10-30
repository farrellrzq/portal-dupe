// pages/running-text.tsx
import { getBerita } from '@/controllers/HomeController';
import React from 'react';

type RunningTextProps = {
  berita: Array<{ slug_title: string; title: string }>;
};

export async function getStaticProps() {
  const berita = await getBerita();
  return {
    props: {
      berita: berita || [],
    },
    revalidate: 10, // atur revalidate sesuai kebutuhan
  };
}

const RunningText: React.FC<RunningTextProps> = ({ berita }) => {
  // return JSON.stringify ( berita )
  return (
    <div>
      {berita.map((item, index) => (
        <a href={`/publikasi/berita/${item.slug_title}`} className="text-jacarta-600 hover:text-accent dark:hover:text-accent" key={index}>
          <span className="flex text-xs tracking-wide basis-1/2 text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent mr-2 w-96 my-1 running-text">
            {item.title.slice(0, 50)}
          </span>
        </a>
      ))}
    </div>
  );
};

export default RunningText;

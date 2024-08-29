import { consoleError, API_CMS } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { InformasiPublikProps, InformasiSertaMertaProps, InformasiSetiapSaatProps } from "./types/informasi-publik.type";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString, redisGetList, redisSaveList} from "@/helpers/redis";

export async function getInformasiPublik() {
  const { Id } = await getDomainSite();
  let InformasiPublik: InformasiPublikProps[] | null = null;

  const cachedKey=`informasi_publik_id:${Id}`;

  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     InformasiPublik = cachedResult.map(item => JSON.parse(item)) as InformasiPublikProps[];
     return InformasiPublik;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=&offset=&groupId=Berkala&slug=&key=`});

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiPublik = result ? result : [];
  }
  
  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });  
  }

  return InformasiPublik;
}

export async function getInformasiSertaMerta() {
  const { Id } = await getDomainSite();
  let InformasiSertaMerta: InformasiSertaMertaProps[] | null = null;

  const cachedKey=`informasi_serta_merta_id:${Id}`;

  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     InformasiSertaMerta = cachedResult.map(item => JSON.parse(item)) as InformasiSertaMertaProps[];
     return InformasiSertaMerta;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=&offset=&groupId=Serta%20Merta&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiSertaMerta = result ? result : [];
  }
  
  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });  
  };

  return InformasiSertaMerta;
}

export async function getInformasiSetiapSaat() {
  const { Id } = await getDomainSite();
  let InformasiSetiapSaat: InformasiSetiapSaatProps[] | null = null;

  const cachedKey=`informasi_setiap_saat_id:${Id}`;

 
  const cachedResult=await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
     InformasiSetiapSaat = cachedResult.map(item => JSON.parse(item)) as InformasiSetiapSaatProps[];
     return InformasiSetiapSaat;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=&offset=&groupId=Setiap%20Saat&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiSetiapSaat = result ? result : [];
  }

  if(result.length > 0){
    result.forEach(async(data:any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });  
  };

  return InformasiSetiapSaat;
}
import { consoleError, API_CMS } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { InformasiPublikProps, InformasiSertaMertaProps, InformasiSetiapSaatProps } from "./types/informasi-publik.type";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString} from "@/helpers/redis";

export async function getInformasiPublik() {
  const { Id } = await getDomainSite();
  let InformasiPublik: InformasiPublikProps[] | null = null;

  const cachedKey=`informasi_publik_id:${Id}`;

  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    InformasiPublik=JSON.parse(cachedResult);
    return InformasiPublik;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=3&offset=&groupId=Berkala&slug=&key=`});

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiPublik = result;
  }
  
  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return InformasiPublik;
}

export async function getInformasiSertaMerta() {
  const { Id } = await getDomainSite();
  let InformasiSertaMerta: InformasiSertaMertaProps[] | null = null;

  const cachedKey=`informasi_serta_merta_id:${Id}`;

  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    InformasiSertaMerta=JSON.parse(cachedResult);
    return InformasiSertaMerta;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=3&offset=&groupId=Serta%20Merta&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiSertaMerta = result;
  }
  
  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return InformasiSertaMerta;
}

export async function getInformasiSetiapSaat() {
  const { Id } = await getDomainSite();
  let InformasiSetiapSaat: InformasiSetiapSaatProps[] | null = null;

  const cachedKey=`informasi_setiap_saat_id:${Id}`;

  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    InformasiSetiapSaat=JSON.parse(cachedResult);
    return InformasiSetiapSaat;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K016&limit=3&offset=&groupId=Setiap%20Saat&slug=&key=` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    InformasiSetiapSaat = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return InformasiSetiapSaat;
}
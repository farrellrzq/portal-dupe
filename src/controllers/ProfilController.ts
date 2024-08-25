import { consoleError, API_CMS } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { ImageProps, LandasanProps, MaklumatProps, MottoProps, TupoksiProps } from "./types/profil-controller.type";
import { getToken } from "./HomeController";
import  redis from '@/helpers/redis-client';
import {redisSaveString, redisGetString} from "@/helpers/redis";

export async function getLandasan() {
  const { Id } = await getDomainSite();
  let Landasan: LandasanProps[] | null = null;

  const cachedKey=`landasan_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Landasan=JSON.parse(cachedResult);
    return Landasan;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&groupId=landasanhukum` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Landasan = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Landasan;
}

export async function getImage() {
  const { Id } = await getDomainSite();
  let Image: ImageProps[] | null = null;

  const cachedKey=`image_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Image=JSON.parse(cachedResult);
    return Image;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&limit=&offset=&groupId=Image%20Struktur%20Organisasi` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Image = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Image;
}

export async function getTupoksi() {
  const { Id } = await getDomainSite();
  let Tupoksi: TupoksiProps[] | null = null;

  const cachedKey=`tupoksi_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Tupoksi=JSON.parse(cachedResult);
    return Tupoksi;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/getJabatan?siteId=${Id}` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Tupoksi = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Tupoksi;
}

export async function getMaklumat() {
  const { Id } = await getDomainSite();
  let Maklumat: MaklumatProps[] | null = null;

  const cachedKey=`maklumat_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Maklumat=JSON.parse(cachedResult);
    return Maklumat;
  }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&limit=&offset=&groupId=Maklumat` });

  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Maklumat = result;
  }

  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Maklumat;
}

export async function getMotto() {
  const { Id } = await getDomainSite();
  let Motto: MottoProps[] | null = null;

  const cachedKey=`motto_id:${Id}`;
  const cachedResult=await redisGetString(redis,cachedKey);

  if (cachedResult) {
    Motto=JSON.parse(cachedResult);
    return Motto;
  }
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&limit=3&offset=&groupId=motto%20pelayanan` });
  
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Motto = result;
  }
  
  await redisSaveString(redis,cachedKey, 3600, JSON.stringify(result));

  return Motto;
}

export async function dataPegawai() {
  const { token, url } = await getToken();
  const { Organisasi } = await getDomainSite();
  const body = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ tahun: '2023', instansi: Organisasi, }) }

  const response = await fetch(`${url}/api/kepegawaian/rawdata`, body)

  if (!response.ok) {
    throw new Error('Fething data gagal');
  }
  const pegawai = response.json();
  return pegawai
}
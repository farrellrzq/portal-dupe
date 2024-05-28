import { consoleError } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { ImageProps, LandasanProps, MaklumatProps, MottoProps, TupoksiProps } from "./types/profil-controller.type";
import { getToken } from "./HomeController";


const API_CMS = process.env.API_CMS;
export async function getLandasan() {
  const { Id } = await getDomainSite();
  let Landasan: LandasanProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&groupId=landasanhukum` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Landasan = result;
  }
  return Landasan;
}

export async function getImage() {
  const { Id } = await getDomainSite();
  let Image: ImageProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&limit=&offset=&groupId=Image%20Struktur%20Organisasi` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Image = result;
  }
  return Image;
}

export async function getTupoksi() {
  const { Id } = await getDomainSite();
  let Tupoksi: TupoksiProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getJabatan?siteId=${Id}` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Tupoksi = result;
  }
  return Tupoksi;
}

export async function getMaklumat() {
  const { Id } = await getDomainSite();
  let Maklumat: MaklumatProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&limit=&offset=&groupId=maklumat%20pelayanan` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Maklumat = result;
  }
  return Maklumat;
}

export async function getMotto() {
  const { Id } = await getDomainSite();
  let Motto: MottoProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&limit=&offset=&groupId=motto%20pelayanan` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Motto = result;
  }
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
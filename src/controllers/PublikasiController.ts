import { consoleError } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { CmsContentProps, ExlinkProps } from "./types/controller.type";
import { AgendaProps, DetailBeritaProps, DetailPengumumanProps } from "./types/publikasi-controller.type";

const API_CMS = process.env.API_CMS;
export async function getPengumuman(): Promise<CmsContentProps[] | null> {
  const { Id } = await getDomainSite();
  let pengumuman: CmsContentProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    pengumuman = result;
  }

  return pengumuman
}

export async function getDokumenProduk(): Promise<CmsContentProps[] | null> {
  const { Id } = await getDomainSite();
  let dokumenProduk: CmsContentProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&groupId=&limit=&offset=` });
  if ('error' in result) {
    consoleError('getDokumenProduk()', result.error);
  } else {
    dokumenProduk = result;
  }

  return dokumenProduk
}

export async function getAgendaKegiatan(): Promise<AgendaProps[] | null> {
  const { Id } = await getDomainSite();
  let agendaKegiatan: AgendaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getEvent?siteId=${Id}&type=AG01&limit=` });
  if ('error' in result) {
    consoleError('getAgendaKegiatan()', result.error);
  } else {
    agendaKegiatan = result;
  }

  return agendaKegiatan
}

// export async function getDashboardStatistik(): Promise<AgendaProps[] | null> {
//   const { Id } = await getDomainSite();
//   let DashboardStatistik: AgendaProps[] | null = null;
//   const result = await api({ url: `https://admindata.depok.go.id/api/3/action/package_search?include_private=true&rows=2000` });
//   if ('error' in result) {
//     consoleError('getAgendaKegiatan()', result.error);
//   } else {
//     DashboardStatistik = result;
//   }

//   return DashboardStatistik
// }

export async function getMenu() {
  const { Id } = await getDomainSite();
  let Menu: ExlinkProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&typeId=&limit=&offset=&code=publikasi` });
  if ('error' in result) {
    consoleError('get_content()', result.error);
  } else {
    Menu = result;
  }
  return Menu;
}

export async function getInfografis(): Promise<AgendaProps[] | null> {
  const { Id } = await getDomainSite();
  let Infografis: AgendaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/getGallery?siteId=${Id}&category=&limit=&type=&offset=` });
  if ('error' in result) {
    consoleError('getGallery()', result.error);
  } else {
    Infografis = result;
  }

  return Infografis
}

export async function getVideo(): Promise<AgendaProps[] | null> {
  const { Id } = await getDomainSite();
  let Video: AgendaProps[] | null = null;
  const result = await api({ url: `https://www.depok.go.id/api/youtube` });
  if ('error' in result) {
    consoleError('getAgendaKegiatan()', result.error);
  } else {
    Video = result;
  }
  return Video
}

export async function getDetailBerita(slug_title: string) {
  const { Id } = await getDomainSite();
  let berita: DetailBeritaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=&offset=&category=&slug=${slug_title}&key=` });
  if ('error' in result) {
    consoleError('getBerita()', result.error);
  } else {
    berita = result.slice(0, 10);
  }
  return berita;
}

export async function getDetailBeritaPopuler() {
  const { Id } = await getDomainSite();
  let beritaPopuler: DetailBeritaProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getBerita()', result.error);
  } else {
    beritaPopuler = result.slice(0, 10);
  }
  return beritaPopuler;
}

export async function getDetailPengumuman(slug_title: string) {
  const { Id } = await getDomainSite();
  let Pengumuman: DetailPengumumanProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=&offset=&category=&slug=${slug_title}&key=` });
  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    Pengumuman = result.slice(0, 10);
  }
  return Pengumuman;
}

export async function getDetailPengumumanPopuler() {
  const { Id } = await getDomainSite();
  let PengumumanPopuler: DetailPengumumanProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    PengumumanPopuler = result.slice(0, 10);
  }
  return PengumumanPopuler;
}

export async function getDashboardStatistik() {
  const { Id } = await getDomainSite();
  let DashboardStatistik: AgendaProps[] | null = null;
  const result = await api({ url: `https://admindata.depok.go.id/api/3/action/package_search?include_private=true&rows=2000` });
  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    DashboardStatistik = result?.result?.results || null;
  }
  return DashboardStatistik;
}

export async function getDetailDashboardStatistik(id: string) {
  let DetailDashboardStatistik: AgendaProps[] | null = null;
  const result = await api({ url: `https://admindata.depok.go.id/api/3/action/package_show?id=${id}` });
  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    DetailDashboardStatistik = result?.result?.resources || null;
  }
  return DetailDashboardStatistik;
}
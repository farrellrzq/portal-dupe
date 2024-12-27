import { consoleError, API_CMS, API_YT, API_ADMIN_DATA } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import { CmsContentProps, ExlinkProps } from "./types/controller.type";
import { AgendaProps, DetailBeritaProps, DetailPengumumanProps } from "./types/publikasi-controller.type";

export async function getPengumuman(): Promise<CmsContentProps[] | null> {
  const { Id } = await getDomainSite();
  let pengumuman: CmsContentProps[] | null = null;

  // const cachedKey=`pengumuman_id:${Id}`;
  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //    pengumuman = cachedResult.map(item => JSON.parse(item)) as CmsContentProps[];
  //    return pengumuman;
  // }
  
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=5&offset=&category=&slug=&key=` });

  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    pengumuman = result ? result : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });  
  // }

  return pengumuman;
}

export async function getDokumenProduk(): Promise<CmsContentProps[] | null> {
  const { Id } = await getDomainSite();
  let dokumenProduk: CmsContentProps[] | null = null;

  // const cachedKey=`dokumen_produk_id:${Id}`;
  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //    dokumenProduk = cachedResult.map(item => JSON.parse(item)) as CmsContentProps[];
  //    return dokumenProduk;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K010&groupId=&limit=&offset=`});

  if ('error' in result) {
    consoleError('getDokumenProduk()', result.error);
  } else {
    dokumenProduk = result ? result  : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });  
  // }

  return dokumenProduk
}

export async function getAgendaKegiatan(): Promise<AgendaProps[] | null> {
  const { Id } = await getDomainSite();
  let agendaKegiatan: AgendaProps[] | null = null;

  // const cachedKey=`agenda_kegiatan_id:${Id}`;
  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //    agendaKegiatan = cachedResult.map(item => JSON.parse(item)) as AgendaProps[];
  //    return agendaKegiatan;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/getEvent?siteId=${Id}&type=AG01&limit=` });

  if ('error' in result) {
    consoleError('getAgendaKegiatan()', result.error);
  } else {
    agendaKegiatan = result ? result : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });  
  // }

  return agendaKegiatan
}


export async function getMenu() {
  const { Id } = await getDomainSite();
  let Menu: ExlinkProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getExLink?siteId=${Id}&typeId=&limit=&offset=&code=publikasi` });

  if ('error' in result) {
    // consoleError('get_content()', result.error);
  } else {
    Menu = result ? result : [];
  }


  return Menu;
}

export async function getInfografis(): Promise<AgendaProps[] | null> {
  const { Id } = await getDomainSite();
  let Infografis: AgendaProps[] | null = null;

  // const cachedKey=`infografis_cms_id:${Id}`;
 
  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //    Infografis = cachedResult.map(item => JSON.parse(item)) as AgendaProps[];
  //    return Infografis;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/getGallery?siteId=${Id}&category=&limit=&type=&offset=` });

  if ('error' in result) {
    consoleError('getGallery()', result.error);
  } else {
    Infografis = result ? result : [];
  }

  // if(result.length > 0){
  //   result.forEach(async(data:any) => {
  //     await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
  //   });  
  // }

  return Infografis
}

export async function getVideo(): Promise<AgendaProps[] | null> {
  let Video: AgendaProps[] | null = null;
  const result = await api({ url: `${API_YT}` });
  if ('error' in result) {
    consoleError('getAgendaKegiatan()', result.error);
  } else {
    Video = result ? result : [];
  }
  return Video
}

export async function getDetailBerita(slug_title: string) {
  const { Id } = await getDomainSite();
  let berita: DetailBeritaProps[] | null = null;

  // const cachedKey=`berita_id:${Id}`;
  // const cachedResult=await redisDetailValueList(redis, cachedKey, slug_title);

  // if (cachedResult) {
  //   berita=cachedResult;
  //   return berita;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=&offset=&category=&slug=${slug_title}&key=` });
  if ('error' in result) {
    consoleError('getBerita()', result.error);
  } else {
    berita =  result ? result.slice(0, 10) : [];
  }

  return berita;
}

export async function getDetailBeritaPopuler() {
  const { Id } = await getDomainSite();
  let beritaPopuler: DetailBeritaProps[] | null = null;

  // const cachedKey=`berita_id:${Id}`;
  // const cachedResult=await redisGetList(redis, cachedKey);
  

  // if (cachedResult.length > 0) {
  //   beritaPopuler = cachedResult.map(item => JSON.parse(item)) as DetailBeritaProps[];
  //   beritaPopuler=beritaPopuler.slice(0,10);
  //   return beritaPopuler;
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K001&limit=&offset=&category=&slug=&key=` });

  if ('error' in result) {
    consoleError('getBerita()', result.error);
  } else {
    beritaPopuler = result ? result.slice(0, 10) : [];
  }

  return beritaPopuler;
}

export async function getDetailPengumuman(slug_title: string) {
  const { Id } = await getDomainSite();
  let Pengumuman: DetailPengumumanProps[] | null = null;

  // const cachedKey=`pengumuman_publikasi_id:${Id}`;
  // const cachedResult=await redisDetailValueList(redis, cachedKey, slug_title);

  // if (cachedResult) {
  //     Pengumuman = cachedResult.map(item => JSON.parse(item)) as DetailPengumumanProps[];
  //     Pengumuman= Pengumuman.slice(0,10);
  // }

  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=&offset=&category=&slug=${slug_title}&key=` });

  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    Pengumuman = result ? result.slice(0, 10) : [];
  }

  return Pengumuman;
}

export async function getDetailPengumumanPopuler() {
  const { Id } = await getDomainSite();
  let PengumumanPopuler: DetailPengumumanProps[] | null = null;

  // const cachedKey=`pengumuman_id:${Id}`;
  // const cachedResult=await redisGetList(redis, cachedKey);

  // if (cachedResult.length > 0) {
  //   PengumumanPopuler = cachedResult.map(item => JSON.parse(item)) as DetailPengumumanProps[];
  //   PengumumanPopuler=PengumumanPopuler.slice(0,10);
  //   return PengumumanPopuler;
  // }
  
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K008&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getPengumuman()', result.error);
  } else {
    PengumumanPopuler = result ? result.slice(0, 10) : [];
  }

  return PengumumanPopuler;
}

export async function getDashboard() {
  const { Id } = await getDomainSite();
  let Dashboard: CmsContentProps[] | null = null;
  const result = await api({ url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K009&limit=&offset=&category=&slug=&key=` });
  if ('error' in result) {
    consoleError('getDashboard()', result.error);
  } else {
    Dashboard = result.slice(0, 10);
  }
  return Dashboard;
}

export async function getDashboardStatistik() {
  let DashboardStatistik: AgendaProps[] | null = null;
  const result = await api({ url: `${API_ADMIN_DATA}/Api/catalog` });
  if ('error' in result) {
    consoleError('getDashboardStatistik()', result.error);
  } else {
    DashboardStatistik = result?.dataset || null;
  }
  return DashboardStatistik;
}

export async function getDetailDashboardStatistik(id: string) {
  let DetailDashboardStatistik: AgendaProps[] | null = null;
  const result = await api({ url: `${API_ADMIN_DATA}/Api/catalog?id=${id}` });
  if ('error' in result) {
    consoleError('getDetailDashboardStatistik()', result.error);
  } else {
    DetailDashboardStatistik = result?.dataset || null;
  }

  return DetailDashboardStatistik;
}

import { consoleError, API_CMS, getErrorMessage } from "@/helpers/site";
import { api, getDomainSite } from "./Controller";
import {
  ImageProps,
  LandasanProps,
  MaklumatProps,
  MottoProps,
  TupoksiProps,
} from "./types/profil-controller.type";
import { getToken } from "./HomeController";
import redis from "@/helpers/redis-client";
import { redisSaveString, redisGetString, redisGetList, redisSaveList } from "@/helpers/redis";

export async function getLandasan() {
  const { Id } = await getDomainSite();
  let Landasan: LandasanProps[] | null = null;

  const result = await api({
    url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&groupId=landasanhukum&limit=`,
  });

  if ("error" in result) {
    consoleError("get_content()", result.error);
  } else {
    Landasan = result ? result : [];
  }

  return Landasan;
}

export async function getImage() {
  const { Id } = await getDomainSite();
  let Image: ImageProps[] | null = null;

  const result = await api({
    url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&groupId=Image%20Struktur%20Organisasi`,
  });
  if ("error" in result) {
    consoleError("get_content()", result.error);
  } else {
    Image = result ? result : [];
  }

  return Image;
}

export async function getTupoksi() {
  const { Id } = await getDomainSite();
  let Tupoksi: TupoksiProps[] | null = null;

  const result = await api({ url: `${API_CMS}/ViewPortal/getJabatan?siteId=${Id}` });
  if ("error" in result) {
    consoleError("get_content()", result.error);
  } else {
    Tupoksi = result ? result : [];
  }

  return Tupoksi;
}

export async function getMaklumat() {
  const { Id } = await getDomainSite();
  let Maklumat: MaklumatProps[] | null = null;

  const result = await api({
    url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K006&groupId=Maklumat`,
  });

  if ("error" in result) {
    consoleError("get_content()", result.error);
  } else {
    Maklumat = result ? result : [];
  }

  return Maklumat;
}

export async function getMotto() {
  const { Id } = await getDomainSite();
  let Motto: MottoProps[] | null = null;

  const cachedKey = `motto_id:${Id}`;
  const cachedResult = await redisGetList(redis, cachedKey);

  if (cachedResult.length > 0) {
    Motto = cachedResult.map(item => JSON.parse(item)) as MaklumatProps[];
    return Motto;
  }

  const result = await api({
    url: `${API_CMS}/ViewPortal/get_content?siteId=${Id}&status=ST01&kanalType=K003&limit=3&offset=&groupId=motto%20pelayanan`,
  });

  if ("error" in result) {
    consoleError("get_content()", result.error);
  } else {
    Motto = result ? result : [];
  }

  if (result.length > 0) {
    result.forEach(async (data: any) => {
      await redisSaveList(redis, cachedKey, 3600, JSON.stringify(data));
    });
  }

  return Motto;
}

export async function dataPegawai() {
  let pegawai: LandasanProps[] | null = null;
  try {
    const { token, url } = await getToken();
    const { Organisasi } = await getDomainSite();
    const body = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tahun: "2023", instansi: Organisasi }),
    };

    const response = await fetch(`${url}/api/kepegawaian/rawdata`, body);

    if (!response.ok) {
      throw new Error("Failed to get dataPegawai :" + response.statusText);
    }
    const result =await  response.json();
    pegawai = result.data?.content;
  } catch (error) {
    consoleError('dataPegawai()', getErrorMessage(error));
  }
  return pegawai;
}

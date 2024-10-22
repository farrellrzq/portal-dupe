export type DomainSiteProps = {
  map(arg0: (item: any, index: number) => import("react").JSX.Element): import("react").ReactNode
  Id: string
  Code: string
  Name: string
  imageSite: string
  Alamat: string
  Kecamatan: string
  Kelurahan: string
  Organisasi: string
  StrukturImg: string
  Domain: string
}

export type ProfileSiteProps = {
  Id: string
  Code: string
  Name: string
  Domain: string
  imageSite: string
  LandingImage: string
  Description: string
  ParentId: string
  ContactId: string
  Email: string
  Youtube: string
  Facebook: string
  Twitter: string
  Instagram: string
  Alamat: string
  kecamatan: string
  kelurahan: string
  pic: string
  URLmaps: string
  WhatsApp: string
  Telp: string
  StatusAkreditasi: string
  JadwalBuka: string
  KodeSuratResmi: string
  Visi: string
  Misi: string | TrustedHTML | null
}

export type ExlinkProps = {
  Id: string,
  TypeId: string,
  Code: string,
  TitleMenu: string,
  SlugTitle: string,
  URLMenu: string | null,
  ImageMenu: string,
  Description: string,
  CategoryGroup: string | null,
  GroupId: string,
  IdGrup: string | null,
  ParentId: string,
  LevelMenu: string | null,
  SiteId: string,
  CreateDate: string,
  Creator: string,
  ModifyDate: string,
  Modifier: string,
  Dashboard: string | null;
  url: string | null;
}

export type CmsContentProps = {
  content_id: string
  type_id: string
  JenisLayanan: string | null,
  title: string
  template_id: string | null,
  category_id: string
  content: string
  urlcontent: string
  author: string
  sumber_informasi: string
  lampiran: string
  uploaddokumen: string | null,
  jenis_lampiran: string | null,
  status: string
  slug_title: string
  organisasi_id: string
  ParentId: string | null,
  ref_id: string | null,
  tgl_publish: string
  created_at: string
  updated_at: string
  site_id: string
  SiteName: string
  DomainSite: string
  Kanal: string
  Category: string | null,
  Author: string
  TypeLayanan: string | null,
  Dashboard: string | null
}

export type VisitProps = {
  w_tahun: { Jumlah: number }[]
  w_bulan: { Jumlah: number }[]
  w_minggu: { Jumlah: number }[]
  w_kemarin: { Jumlah: number }[]
  w_hari: { Jumlah: number }[]
  agentInfo?: string;
  agentBrowser?: string;
  device?: string;
  browse?: string;
}

export type CategoryProps = {
  Id: string;
  Category: string;
  Total: string;
}
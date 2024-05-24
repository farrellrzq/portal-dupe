export type AgendaProps = {
  name: any;
  category: string;
  Id: string;
  SiteId: string;
  Type: string;
  Title: string;
  Penyelenggara: string;
  PIC: string;
  Alamat: string;
  TanggalAwal: string;
  TanggalAkhir: string;
  OrganisasiId: string;
  Media?: any;
  Deskripsi: string;
};

export type ExlinkProps = {
  Id: string | null;
  TypeId: string | null;
  Code: string | null;
  TitleMenu: string | null;
  SlugTitle: string | null;
  URLMenu: string | null;
  ImageMenu: string | null;
  Description: string | null;
  CategoryGroup: string | null;
  GroupId: string | null;
  IdGrup: string | null;
  ParentId: string | null;
  LevelMenu: string | null;
  SiteId: string | null;
  CreateDate: string | null;
  Creator: string | null;
  ModifyDate: string | null;
  Modifier: string | null;
}

export type InfografisProps = {
  Id: string;
  Title: string;
  Media: string;
  MediaType: string;
  Description: string;
  URL: string;
  SiteId: string;
  CategoryId: string;
  OrganizationId: string;
  CreateDate: string;
};

export interface VideoProps {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export type DetailBeritaProps = {
  content_id: string;
  type_id: string;
  JenisLayanan: null | string;
  title: string;
  template_id: null | string;
  category_id: string;
  content: string;
  urlcontent: string;
  author: string;
  sumber_informasi: string;
  lampiran: string;
  uploaddokumen: null | string;
  jenis_lampiran: null | string;
  status: string;
  slug_title: string;
  organisasi_id: string;
  ParentId: null | string;
  ref_id: null | string;
  tgl_publish: string;
  created_at: string;
  updated_at: string;
  site_id: string;
  SiteName: string;
  DomainSite: string;
  Kanal: string;
  Category: string;
  Author: string;
  TypeLayanan: null | string;
};

export type DetailPengumumanProps = {
  content_id: string;
  type_id: string;
  JenisLayanan: null | string;
  title: string;
  template_id: null | string;
  category_id: string;
  content: string;
  urlcontent: string;
  author: string;
  sumber_informasi: string;
  lampiran: null | string;
  uploaddokumen: null | string;
  jenis_lampiran: null | string;
  status: string;
  slug_title: string;
  organisasi_id: string;
  ParentId: null | string;
  ref_id: null | string;
  tgl_publish: string;
  created_at: string;
  updated_at: string;
  site_id: string;
  SiteName: string;
  DomainSite: string;
  Kanal: string;
  Category: null | string;
  Author: string;
  TypeLayanan: null | string;
};

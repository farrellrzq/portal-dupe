import { getDetailDashboardStatistik } from '@/controllers/PublikasiController';
import React from 'react'
import Content from './content';

export default async function FetchContent({params}: { params: {id: string} }) {
    // const detailDashboardStatistik = await getDetailDashboardStatistik(params.id);
    // console.log(detailDashboardStatistik);
    const detailDashboardStatistik = null;
  return (
    <Content detailDashboardStatistik={detailDashboardStatistik} />
  )
}

import { getDomainSite } from '@/controllers/Controller';

export default async function ContentImgSotk() {
    const { StrukturImg } = await getDomainSite();

    return (
        <div className="container mx-auto">
            <img src={StrukturImg ? `https://cms.depok.go.id/upload/organizations/${StrukturImg}` : ''} className="mx-auto w-full" alt="team" />
        </div>
    )
}
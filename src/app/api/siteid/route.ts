import { getDomainSite } from "@/controllers/Controller";
import { getErrorMessage } from "@/helpers/site";
import { NextResponse } from "next/server";

export async function POST(){
    try {
        const domain = await getDomainSite();
        return NextResponse.json({Id: domain.Id})
    } catch (error) {
        return NextResponse.json({Error: getErrorMessage(error)}, {status: 500})
    }
}
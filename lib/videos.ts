import { groq } from "next-sanity"
import { getSanityClient, isSanityEnabled } from "@/lib/sanity/client"

export type CompanyVideoItem = {
  id: string
  title: string
  description?: string
  videoUrl: string
}

const companyVideosQuery = groq`
  *[_type == "companyVideo" && coalesce(shown, true) == true && defined(videoUrl)] | order(coalesce(sortOrder, 999) asc, _createdAt desc) {
    "id": _id,
    title,
    "description": description,
    "videoUrl": videoUrl
  }
`

export async function getCompanyVideos(): Promise<CompanyVideoItem[]> {
  if (!isSanityEnabled()) return []
  const client = getSanityClient()
  if (!client) return []
  try {
    return await client.fetch<CompanyVideoItem[]>(companyVideosQuery)
  } catch (e) {
    console.error("[videos] Sanity fetch failed:", e)
    return []
  }
}

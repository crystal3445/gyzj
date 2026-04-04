import { createClient } from "next-sanity"

export const apiVersion = "2024-01-01"

export function isSanityEnabled(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
  return Boolean(id && id.length >= 8)
}

export function getSanityClient() {
  if (!isSanityEnabled()) return null
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion,
    useCdn: true,
  })
}

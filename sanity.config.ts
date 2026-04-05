"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./sanity/schemaTypes"

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "placeholder"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "gyzj",
  title: "国医仲景 · 内容管理",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})

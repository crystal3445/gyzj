import { defineField, defineType } from "sanity"

export default defineType({
  name: "companyVideo",
  title: "企业视频",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "简介",
      type: "text",
      rows: 2,
      description: "显示在标题下方的一句话说明，可留空。",
    }),
    defineField({
      name: "videoUrl",
      title: "视频地址",
      type: "url",
      validation: (Rule) => Rule.required(),
      description:
        "支持：① B 站稿件页链接（推荐，国内访问快）；② YouTube；③ 以 .mp4 / .webm 结尾的可直链播放地址。**不建议**把超长高清视频上传到 Sanity，请先发到视频平台再粘贴页面链接。",
    }),
    defineField({
      name: "sortOrder",
      title: "排序（数字越小越靠前）",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "shown",
      title: "在官网展示",
      type: "boolean",
      initialValue: true,
      description: "关闭后首页「企业视频」区块不再显示该条。",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "videoUrl" },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "未命名",
        subtitle: subtitle ? String(subtitle).slice(0, 60) : "",
      }
    },
  },
})

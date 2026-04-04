import { defineField, defineType } from "sanity"

export default defineType({
  name: "post",
  title: "文章",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "网址别名",
      type: "slug",
      description: "保存后用于网址，例如 my-article → /news/my-article",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "摘要",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "正文（Markdown）",
      type: "text",
      rows: 28,
      description: "支持 Markdown：标题、列表、加粗、链接等",
    }),
    defineField({
      name: "published",
      title: "已发布",
      type: "boolean",
      initialValue: true,
      description: "关闭后网站前台不显示",
    }),
  ],
  preview: {
    select: { title: "title", date: "publishedAt" },
    prepare({ title, date }) {
      return {
        title: title ?? "未命名",
        subtitle: date ? new Date(date).toLocaleString("zh-CN") : "",
      }
    },
  },
})

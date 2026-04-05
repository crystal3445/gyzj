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
      name: "content",
      title: "正文",
      type: "blockContent",
      description:
        "文字和图片都在「正文」里：先写一段 → 光标放在段尾按回车 → 点 + 选「图片」→ 再写下一段。左侧可拖动每条块调整顺序。没有单独的附件区。",
    }),
    defineField({
      name: "body",
      title: "正文（旧版 Markdown，仅历史数据）",
      type: "text",
      rows: 12,
      hidden: ({ document }) => !document?.body,
      description: "早期用 Markdown 保存的文章。新文章请只编辑上方「正文」。",
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

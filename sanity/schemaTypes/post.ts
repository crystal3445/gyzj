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
        "图文同一篇里，可拖动排序。粘贴图片：先鼠标点进某段文字里让光标闪烁，再 Ctrl+V；若跑到文末，拖到目标位置即可。或从电脑文件夹把图片文件拖进两段字之间。点工具栏 Image 上传也可。",
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
      title: "在官网展示",
      type: "boolean",
      initialValue: true,
      description:
        "打开：资讯列表和详情里能看到。关闭：仅后台有，官网上不显示。与右上角 Publish 不同，那是把稿子提交到云端。",
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

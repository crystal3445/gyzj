import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "blockContent",
  title: "正文内容",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "正文", value: "normal" },
        { title: "二级标题", value: "h2" },
        { title: "三级标题", value: "h3" },
        { title: "引用", value: "blockquote" },
      ],
      lists: [
        { title: "项目符号", value: "bullet" },
        { title: "编号", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "加粗", value: "strong" },
          { title: "斜体", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "链接",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) => Rule.required().uri({ allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "替代文字",
          description: "简述图片内容，利于无障碍与 SEO",
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "图注",
          description: "显示在图片下方的小字说明",
        }),
      ],
    }),
  ],
})

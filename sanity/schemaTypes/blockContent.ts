import { defineType } from "sanity"

export default defineType({
  name: "blockContent",
  title: "正文内容",
  type: "array",
  of: [
    {
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
    },
  ],
})

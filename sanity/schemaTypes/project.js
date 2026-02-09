export default {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Hospitality", value: "hospitality" },
          { title: "Commercial", value: "commercial" },
          { title: "Public", value: "public" },
          { title: "Master Planning", value: "master-planning" },
          { title: "Mixed Use", value: "mixed-use" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "video",
      title: "Video",
      type: "url",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "noOfStories",
      title: "Number of Stories",
      type: "number",
    },
    {
      name: "siteArea",
      title: "Site Area (sqm)",
      type: "number",
    },
    {
      name: "priority",
      title: "Display Priority",
      type: "number",
      description:
        "Higher numbers appear first. Use spacing (100, 90, 80).",
      initialValue: 100,
      validation: (Rule) => Rule.required().integer(),
    },
  ],
};

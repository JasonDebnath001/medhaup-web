export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "date"
  | "file"
  | "image"
  | "tags"
  | "paragraphs";

export type Field = {
  name: string; // DB column
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // for select
  bucket?: "files" | "images";
  accept?: string; // file input accept
  help?: string;
};

export type Collection = {
  slug: string; // /admin/[slug]
  table: string;
  title: string;
  singular: string;
  listCols: string[]; // columns shown in the list table
  fields: Field[];
};

const LANG = ["Bengali", "English", "Bengali + English"];

export const COLLECTIONS: Collection[] = [
  {
    slug: "products",
    table: "products",
    title: "Store Products",
    singular: "Product",
    listCols: ["title", "category", "price"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Books", "Printed Notes", "Test Series", "Combo"],
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "price", label: "Price (₹)", type: "number", required: true },
      { name: "mrp", label: "MRP (strike-through, optional)", type: "number" },
      { name: "language", label: "Language", type: "select", options: LANG },
      {
        name: "image",
        label: "Product Image",
        type: "image",
        bucket: "images",
        accept: "image/*",
      },
      { name: "in_stock", label: "In stock", type: "boolean" },
      { name: "is_new", label: "Show NEW badge", type: "boolean" },
    ],
  },
  {
    slug: "blogs",
    table: "blog_posts",
    title: "Blog Posts",
    singular: "Post",
    listCols: ["title", "date"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "slug",
        label: "URL Slug",
        type: "text",
        help: "Leave empty to auto-generate from the title",
      },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      {
        name: "content",
        label: "Content",
        type: "paragraphs",
        help: "Separate paragraphs with a blank line",
      },
      {
        name: "cover",
        label: "Cover Image (optional)",
        type: "image",
        bucket: "images",
        accept: "image/*",
      },
      { name: "date", label: "Publish Date", type: "date" },
      { name: "read_mins", label: "Read time (mins)", type: "number" },
      {
        name: "tags",
        label: "Tags",
        type: "tags",
        help: "Comma-separated: Strategy, Books",
      },
    ],
  },
  {
    slug: "pyq",
    table: "pyqs",
    title: "Previous Year Papers",
    singular: "Paper",
    listCols: ["title", "year"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "language", label: "Language", type: "select", options: LANG },
      {
        name: "paper_url",
        label: "Question Paper PDF",
        type: "file",
        bucket: "files",
        accept: "application/pdf",
        required: true,
      },
      {
        name: "answer_key_url",
        label: "Answer Key PDF (optional)",
        type: "file",
        bucket: "files",
        accept: "application/pdf",
      },
      {
        name: "file_size",
        label: "File size (auto-filled on upload)",
        type: "text",
      },
      { name: "is_new", label: "Show NEW badge", type: "boolean" },
    ],
  },
  {
    slug: "gallery",
    table: "gallery_items",
    title: "Gallery",
    singular: "Photo",
    listCols: ["alt", "category"],
    fields: [
      {
        name: "src",
        label: "Photo",
        type: "image",
        bucket: "images",
        accept: "image/*",
        required: true,
      },
      {
        name: "alt",
        label: "Alt text (describe the photo)",
        type: "text",
        required: true,
      },
      { name: "caption", label: "Caption (optional)", type: "text" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Classes", "Toppers", "Events"],
      },
      {
        name: "aspect",
        label: "Shape",
        type: "select",
        options: ["square", "tall", "wide"],
      },
    ],
  },
  {
    slug: "current-affairs-monthly",
    table: "current_affairs_monthly",
    title: "CA — Monthly PDFs",
    singular: "Monthly PDF",
    listCols: ["title", "month"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "month",
        label: "Month",
        type: "text",
        required: true,
        help: "e.g. July 2026",
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "language", label: "Language", type: "select", options: LANG },
      {
        name: "file_url",
        label: "PDF",
        type: "file",
        bucket: "files",
        accept: "application/pdf",
        required: true,
      },
      { name: "file_size", label: "File size (auto-filled)", type: "text" },
      { name: "is_new", label: "Show NEW badge", type: "boolean" },
    ],
  },
  {
    slug: "current-affairs-daily",
    table: "current_affairs_daily",
    title: "CA — Daily Updates",
    singular: "Update",
    listCols: ["headline", "date", "tag"],
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      {
        name: "detail",
        label: "One-line detail / why it matters",
        type: "textarea",
      },
      { name: "date", label: "Date", type: "date" },
      {
        name: "tag",
        label: "Tag",
        type: "select",
        options: [
          "Health",
          "National",
          "West Bengal",
          "Science",
          "Sports",
          "Awards",
        ],
      },
    ],
  },
  {
    slug: "resources",
    table: "resources",
    title: "Free Resources",
    singular: "Resource",
    listCols: ["title", "category"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Syllabus", "Papers", "Notes", "Mocks", "Guides"],
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "language", label: "Language", type: "select", options: LANG },
      {
        name: "file_url",
        label: "PDF",
        type: "file",
        bucket: "files",
        accept: "application/pdf",
        required: true,
      },
      { name: "file_size", label: "File size (auto-filled)", type: "text" },
      { name: "is_new", label: "Show NEW badge", type: "boolean" },
    ],
  },
  {
    slug: "syllabus-subjects",
    table: "syllabus_subjects",
    title: "Syllabus — Subjects",
    singular: "Subject",
    listCols: ["name", "questions"],
    fields: [
      {
        name: "sid",
        label: "Stable ID",
        type: "text",
        required: true,
        help: "lowercase-with-dashes, e.g. biology",
      },
      { name: "name", label: "Subject Name", type: "text", required: true },
      { name: "blurb", label: "One-line blurb", type: "textarea" },
      { name: "questions", label: "Questions in paper", type: "number" },
      {
        name: "file_url",
        label: "Subject Syllabus PDF",
        type: "file",
        bucket: "files",
        accept: "application/pdf",
      },
      {
        name: "file_name",
        label: "Download filename",
        type: "text",
        help: "e.g. medhaup_biology_syllabus.pdf",
      },
    ],
  },
  {
    slug: "syllabus-downloads",
    table: "syllabus_downloads",
    title: "Syllabus — Full PDFs",
    singular: "Download",
    listCols: ["label"],
    fields: [
      { name: "label", label: "Button label", type: "text", required: true },
      { name: "caption", label: "Caption", type: "text" },
      {
        name: "file_url",
        label: "PDF",
        type: "file",
        bucket: "files",
        accept: "application/pdf",
        required: true,
      },
      { name: "file_name", label: "Download filename", type: "text" },
    ],
  },
  {
    slug: "batches",
    table: "batches",
    title: "Batches",
    singular: "Batch",
    listCols: ["name", "start_date", "seats_filled"],
    fields: [
      { name: "name", label: "Batch name", type: "text", required: true },
      { name: "start_date", label: "Start date (display text)", type: "text" },
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: ["Online", "Offline", "Hybrid"],
      },
      { name: "timing", label: "Timing", type: "text", help: "e.g. Mon–Sat" },
      { name: "seats_filled", label: "Seats filled", type: "number" },
      { name: "seats_total", label: "Total seats", type: "number" },
    ],
  },
];

export const getCollection = (slug: string) =>
  COLLECTIONS.find((c) => c.slug === slug);

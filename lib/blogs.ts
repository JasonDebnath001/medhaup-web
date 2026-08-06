/* ----------------------------------------------------------------
   BLOGS — content is stored as an array of paragraphs for now so
   we don't need a markdown parser. The admin panel will later
   save rich text / markdown and we'll render that instead.
----------------------------------------------------------------- */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string; // path inside /public or ImageKit URL
  date: string; // ISO — "2026-08-01"
  readMins: number;
  tags: string[];
  content: string[]; // each string = one paragraph
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "anm-gnm-2027-exam-pattern-explained",
    title:
      "ANM/GNM 2027 Exam Pattern Explained — Marks, Negative Marking & Strategy",
    excerpt:
      "100 questions, 115 marks, two categories with different negative marking. Here's exactly how the paper works and how to attempt it.",
    date: "2026-08-01",
    readMins: 6,
    tags: ["Exam Pattern", "Strategy"],
    content: [
      "The WBJEEB ANM/GNM CET paper has 100 MCQs across two categories. Category I carries 85 questions of 1 mark each; Category II carries 15 questions of 2 marks each.",
      "Negative marking works differently in each category — ¼ mark deducted in Category I, ½ mark in Category II — which changes how aggressive you should be while attempting.",
      "Our recommended strategy: clear Category I first at speed, flag doubtful Category II questions, and only guess where you can eliminate two options.",
    ],
  },
  {
    slug: "best-books-anm-gnm-preparation",
    title:
      "Which Books Do You Actually Need for ANM/GNM? (Hint: Fewer Than You Think)",
    excerpt:
      "WB board textbooks cover most of the syllabus. Here's the short list that's enough — and what to skip.",
    date: "2026-07-20",
    readMins: 4,
    tags: ["Books", "Study Plan"],
    content: [
      "Most of the ANM/GNM syllabus maps directly onto Madhyamik-level WB board textbooks — especially Life Science and Physical Science.",
      "You do not need a stack of ten guides. One consolidated guidebook, your board textbooks, and a mock test series is the complete kit.",
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
